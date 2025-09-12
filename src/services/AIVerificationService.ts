interface AIVerificationRequest {
  postContent: string;
  category: string;
  attachments: { name: string; type: string; url?: string }[];
  metadata: {
    studentYear: number;
    department: string;
    previousActivities: string[];
    authorName: string;
  };
}

interface AIVerificationResponse {
  authenticity_score: number;
  category_match: number;
  red_flags: string[];
  suggestions: string[];
  auto_decision: 'approve' | 'review' | 'reject';
  confidence: number;
  reasoning: string;
}

export class AIVerificationService {
  private static readonly GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  
  static async verifyPost(request: AIVerificationRequest): Promise<AIVerificationResponse> {
    // Access environment variable in React (Vite uses import.meta.env)
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('Gemini API key not found, using fallback verification');
      return this.fallbackVerification(request);
    }

    const prompt = this.buildVerificationPrompt(request);
    
    try {
      const response = await fetch(`${this.GEMINI_API_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            topK: 20,
            topP: 0.8,
            maxOutputTokens: 512,
            candidateCount: 1
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error?.message || `HTTP ${response.status}`;
        
        if (response.status === 429) {
          console.warn('Gemini API rate limit exceeded, using fallback verification');
        } else if (response.status === 403) {
          console.warn('Gemini API quota exceeded or access denied, using fallback verification');
        } else {
          console.error(`Gemini API error: ${errorMessage}`);
        }
        
        throw new Error(`Gemini API error: ${errorMessage}`);
      }

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!aiResponseText) {
        throw new Error('Invalid response from Gemini API');
      }

      return this.parseAIResponse(aiResponseText);
    } catch (error) {
      console.error('AI verification failed:', error);
      return this.fallbackVerification(request);
    }
  }

  private static buildVerificationPrompt(request: AIVerificationRequest): string {
    return `
You are an expert AI system for verifying student achievements and activities. Analyze the following student post for authenticity and appropriateness.

STUDENT DETAILS:
- Name: ${request.metadata.authorName}
- Year: ${request.metadata.studentYear}
- Department: ${request.metadata.department}
- Previous Activities: ${request.metadata.previousActivities.join(', ') || 'None listed'}

POST DETAILS:
- Category: ${request.category}
- Content: "${request.postContent}"
- Attachments: ${request.attachments.map(a => `${a.name} (${a.type})`).join(', ') || 'None'}

ANALYSIS CRITERIA:
1. Authenticity: Does this seem like a genuine achievement?
2. Category Match: Does the content match the selected category?
3. Consistency: Is it consistent with student's profile?
4. Language Quality: Is the language appropriate and believable?
5. Supporting Evidence: Are attachments relevant and sufficient?

Please respond with ONLY a valid JSON object in this exact format:
{
  "authenticity_score": 85,
  "category_match": 90,
  "red_flags": ["specific issue 1", "specific issue 2"],
  "suggestions": ["specific suggestion 1", "specific suggestion 2"],
  "auto_decision": "approve",
  "confidence": 88,
  "reasoning": "Brief explanation of the decision"
}

SCORING GUIDELINES:
- authenticity_score: 0-100 (how authentic the achievement seems)
- category_match: 0-100 (how well it fits the category)
- auto_decision: "approve" (>80% authentic & category match), "review" (40-80%), "reject" (<40%)
- confidence: 0-100 (how confident you are in your analysis)

RED FLAGS TO LOOK FOR:
- Generic or vague descriptions
- Inconsistent details
- Inappropriate language
- Mismatched category
- Suspicious timing or achievements
- Lack of specific details

RESPOND WITH ONLY THE JSON OBJECT, NO OTHER TEXT.
`;
  }

  private static parseAIResponse(response: string): AIVerificationResponse {
    try {
      // Clean up the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const cleanedResponse = jsonMatch[0]
        .replace(/```json\s*/, '')
        .replace(/```\s*$/, '')
        .trim();
      
      const parsed = JSON.parse(cleanedResponse);
      
      // Validate and sanitize the response
      return {
        authenticity_score: Math.max(0, Math.min(100, parsed.authenticity_score || 50)),
        category_match: Math.max(0, Math.min(100, parsed.category_match || 50)),
        red_flags: Array.isArray(parsed.red_flags) ? parsed.red_flags.slice(0, 5) : [],
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.slice(0, 5) : [],
        auto_decision: ['approve', 'review', 'reject'].includes(parsed.auto_decision) 
          ? parsed.auto_decision 
          : 'review',
        confidence: Math.max(0, Math.min(100, parsed.confidence || 50)),
        reasoning: typeof parsed.reasoning === 'string' 
          ? parsed.reasoning.substring(0, 200) 
          : 'AI analysis completed'
      };
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return this.getDefaultResponse();
    }
  }

  private static fallbackVerification(request: AIVerificationRequest): AIVerificationResponse {
    // Rule-based fallback when AI fails
    const categoryKeywords = this.getCategoryKeywords();
    const contentLower = request.postContent.toLowerCase();
    
    let keywordScore = 0;
    const categoryWords = categoryKeywords[request.category.toLowerCase()] || [];
    
    categoryWords.forEach(keyword => {
      if (contentLower.includes(keyword.toLowerCase())) {
        keywordScore += 1;
      }
    });
    
    const categoryMatch = Math.min((keywordScore / Math.max(categoryWords.length, 1)) * 100, 100);
    const hasAttachments = request.attachments.length > 0;
    const authenticityScore = Math.min(categoryMatch + (hasAttachments ? 20 : 0), 100);
    
    const suspiciousPatterns = this.detectSuspiciousPatterns(request.postContent);
    
    let autoDecision: 'approve' | 'review' | 'reject' = 'review';
    if (authenticityScore > 80 && categoryMatch > 75 && suspiciousPatterns.length === 0) {
      autoDecision = 'approve';
    } else if (authenticityScore < 40 || suspiciousPatterns.length > 2) {
      autoDecision = 'reject';
    }
    
    return {
      authenticity_score: Math.round(authenticityScore),
      category_match: Math.round(categoryMatch),
      red_flags: suspiciousPatterns,
      suggestions: this.generateSuggestions(request),
      auto_decision: autoDecision,
      confidence: 65,
      reasoning: 'Analyzed using rule-based fallback system'
    };
  }

  private static getCategoryKeywords(): { [key: string]: string[] } {
    return {
      'nss': ['community', 'service', 'volunteer', 'social', 'nss', 'blood donation', 'cleanliness'],
      'sports': ['tournament', 'competition', 'medal', 'sports', 'athletics', 'championship', 'match'],
      'cultural': ['dance', 'music', 'drama', 'cultural', 'fest', 'performance', 'art'],
      'technical': ['hackathon', 'coding', 'project', 'internship', 'tech', 'programming', 'development'],
      'academic': ['research', 'paper', 'conference', 'seminar', 'workshop', 'course', 'certification'],
      'leadership': ['president', 'secretary', 'coordinator', 'leader', 'organized', 'managed']
    };
  }

  private static detectSuspiciousPatterns(content: string): string[] {
    const patterns: string[] = [];
    const contentLower = content.toLowerCase();
    
    // Check for generic content
    if (contentLower.length < 50) {
      patterns.push('Content too brief, lacks specific details');
    }
    
    // Check for common suspicious words
    const suspiciousWords = ['amazing', 'incredible', 'best ever', 'perfect'];
    const suspiciousCount = suspiciousWords.filter(word => contentLower.includes(word)).length;
    if (suspiciousCount > 2) {
      patterns.push('Overly promotional language detected');
    }
    
    // Check for repetitive content
    const words = content.split(' ');
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    if (words.length > 20 && uniqueWords.size / words.length < 0.5) {
      patterns.push('Repetitive content structure');
    }
    
    return patterns;
  }

  private static generateSuggestions(request: AIVerificationRequest): string[] {
    const suggestions: string[] = [];
    
    if (request.postContent.length < 100) {
      suggestions.push('Add more specific details about the achievement');
    }
    
    if (request.attachments.length === 0) {
      suggestions.push('Attach supporting documents or certificates');
    }
    
    if (!request.postContent.includes('date') && !request.postContent.match(/\d{4}|\d{1,2}\/\d{1,2}/)) {
      suggestions.push('Include specific dates of the activity');
    }
    
    suggestions.push('Provide more context about your role and contribution');
    
    return suggestions.slice(0, 3);
  }

  private static getDefaultResponse(): AIVerificationResponse {
    return {
      authenticity_score: 50,
      category_match: 50,
      red_flags: ['Unable to perform AI analysis'],
      suggestions: ['Please review manually', 'Add more details if possible'],
      auto_decision: 'review',
      confidence: 30,
      reasoning: 'Default response due to analysis failure'
    };
  }
}

export type { AIVerificationRequest, AIVerificationResponse };
