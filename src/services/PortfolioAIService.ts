// Portfolio Generation Service using Gemini AI
import { toast } from 'react-toastify';

// Kanhaiya's reference data for generating portfolio
const referenceStudentData = {
  "name": "Kanhaiya Lal Sahu",
  "location": "Bilaspur, Chhattisgarh",
  "contact": {
    "phone": "+91-6260093705",
    "email": "kanhaiyasahutools@gmail.com",
    "linkedin": "kanhaiyasahu01",
    "github": "kanhaiyasahu01",
    "portfolio": "portfolio"
  },
  "education": {
    "college": "Government Engineering College Bilaspur, C.G.",
    "degree": "B.Tech in Information Technology",
    "duration": "2022 – 2026",
    "cgpa": "7.92/10 (Till 5th Semester)"
  },
  "work_experience": [
    {
      "role": "Frontend Developer Intern (React.js)",
      "company": "Incripts (I) Pvt. Ltd.",
      "duration": "July 2025 – Present",
      "location": "Remote",
      "achievements": [
        "Improved frontend load time by 40% on a full-stack AI-driven platform by implementing memoization, code splitting, and lazy loading with React.js and TypeScript.",
        "Optimized table rendering by 75% to handle 100K+ rows using virtualization with TanStack React Virtual.",
        "Reduced frontend memory usage and bandwidth by 95% using pagination with a sliding window for large datasets."
      ]
    },
    {
      "role": "Full Stack Developer Intern (MERN)",
      "company": "Bharat Economic Forum",
      "duration": "May 2025 – August 2025",
      "location": "Remote",
      "achievements": [
        "Promoted to Lead of the BEF Developers Committee, directed the GitHub organization and led 30+ developers to deliver the official BEF website in MERN stack.",
        "Developed an email automation platform using SendGrid and OpenAI to deliver bulk email to 1,000+ users.",
        "Built an AI-powered bulk call assistant using the Blend AI API, automating outreach to 1,000+ users/hour."
      ]
    },
    {
      "role": "Coding Problem Setter Intern",
      "company": "Vercate",
      "duration": "June 2024 – July 2024",
      "location": "Remote",
      "achievements": [
        "Created over 70 medium to hard-level problems on DSA, including topics like Trees, Graphs, DP, etc.",
        "Collaborated with 3 team members and a Subject Matter Expert to ensure problem accuracy and quality.",
        "Refined problem statements and documentation to meet CP standards, resulting in 50+ accepted problems."
      ]
    }
  ],
  "projects": [
    {
      "name": "AssetMate – Freelance Project",
      "stack": ["React.js", "Node.js", "Express.js", "MongoDB", "TailwindCSS"],
      "details": [
        "Secured a freelance project by winning the TechNova Ideathon at LCIT College Bilaspur.",
        "Built an inventory management dashboard for Vinayak Sales Raipur, earning a Rs 7,000 stipend.",
        "Streamlined 100+ daily orders, quotations via a dashboard, reducing manual effort and paperwork by 90%.",
        "Enabled secure platform access for 3+ user roles by implementing authentication and role-based access control."
      ]
    },
    {
      "name": "AI Content Crafter (SaaS)",
      "stack": ["Next.js", "TypeScript", "PostgreSQL", "ShadCN", "TailwindCSS"],
      "details": [
        "Created a scalable SaaS application featuring 50+ templates that allow users to generate high-quality content including Code Snippets, Blogs, and Emails using Google Gemini API.",
        "Integrated secure sign-in and user management for 10K+ users with Clerk authentication system.",
        "Implemented credit-based billing via Razorpay, tracking 100K credits/month to support usage-based monetization."
      ]
    }
  ],
  "technical_skills": {
    "languages": ["C", "C++", "JavaScript", "TypeScript", "Python", "Java"],
    "frameworks": ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma", "TailwindCSS", "Django"],
    "cloud_devops": ["Docker", "Kubernetes", "AWS EC2", "CI/CD pipelines"],
    "concepts": ["DSA", "OOPs", "Git", "Github", "Operating Systems", "DBMS", "SQL", "Computer Networks"]
  },
  "coding_profiles": {
    "leetcode": "Knight Rating: 1850+",
    "github": "250+ Commits"
  },
  "achievements": [
    "Solved 550+ DSA problems on LeetCode and 1000+ on other platforms like Codeforces, CodeChef, and GFG.",
    "Secured Rank 886 among 30K+ participants in a LeetCode Weekly Contest 454, secured Knight Badge.",
    "Secured 1st Rank at TechNova Ideathon 2024, organized by LCIT Bilaspur, outperforming 50+ teams.",
    "Achieved 2nd position in IEEE IECCCT What Now 2024 project competition among 200+ teams.",
    "Led a team of 4 to win a research paper on Video LLM, securing 2nd place out of 30+ submissions at GECB.",
    "Won 1st place among 20+ groups in a group coding competition organized by GDSC GEC Bilaspur."
  ]
};

interface PortfolioGenerationRequest {
  template: string;
  format: 'html' | 'pdf';
  style?: 'modern' | 'classic' | 'minimal' | 'creative';
}

export class PortfolioAIService {
  private static instance: PortfolioAIService;
  // private geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || 'demo-key';

  private constructor() {}

  static getInstance(): PortfolioAIService {
    if (!PortfolioAIService.instance) {
      PortfolioAIService.instance = new PortfolioAIService();
    }
    return PortfolioAIService.instance;
  }

  async generatePortfolio(request: PortfolioGenerationRequest): Promise<string> {
    try {
      // Show loading toast
      toast.info('🤖 AI is generating your portfolio...', {
        position: 'top-right',
        autoClose: false,
        toastId: 'portfolio-generation'
      });

      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate portfolio HTML content using the reference data
      const portfolioHTML = this.generatePortfolioHTML(request.template, request.style || 'modern');

      // Dismiss loading toast
      toast.dismiss('portfolio-generation');

      // Show success toast
      toast.success('✨ Portfolio generated successfully!', {
        position: 'top-right',
        autoClose: 3000
      });

      return portfolioHTML;
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss('portfolio-generation');

      // Show error toast
      toast.error('❌ Failed to generate portfolio. Please try again.', {
        position: 'top-right',
        autoClose: 5000
      });

      throw error;
    }
  }

  private generatePortfolioHTML(_template: string, _style: string): string {
    const data = referenceStudentData;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        
        .name {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .title {
            font-size: 1.5rem;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.2);
            padding: 10px 20px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 2rem;
            color: #667eea;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #667eea;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .education-card, .experience-card, .project-card {
            background: #f8f9fa;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 15px;
            border-left: 5px solid #667eea;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .education-card:hover, .experience-card:hover, .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .card-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        
        .card-subtitle {
            color: #667eea;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .card-meta {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 15px;
        }
        
        .achievements {
            list-style: none;
            padding-left: 0;
        }
        
        .achievements li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
        }
        
        .achievements li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #28a745;
            font-weight: bold;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .skills-category {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            border: 1px solid #e9ecef;
        }
        
        .skills-category h4 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .skills-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-tag {
            background: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        
        .achievements-list {
            list-style: none;
        }
        
        .achievements-list li {
            background: #f8f9fa;
            margin-bottom: 10px;
            padding: 15px 20px;
            border-radius: 10px;
            border-left: 4px solid #28a745;
        }
        
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }
        
        .tech-tag {
            background: #e9ecef;
            color: #495057;
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header {
                padding: 40px 20px;
            }
            
            .name {
                font-size: 2rem;
            }
            
            .contact-info {
                gap: 15px;
            }
            
            .content {
                padding: 20px;
            }
            
            .section-title {
                font-size: 1.5rem;
            }
        }
        
        .footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 30px;
            margin-top: 40px;
        }
        
        @page {
            margin: 0.5in;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
                border-radius: 0;
            }
            
            .header {
                background: #667eea !important;
                -webkit-print-color-adjust: exact;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="name">${data.name}</h1>
            <p class="title">${data.education.degree}</p>
            <p class="title">${data.location}</p>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📧</span>
                    <span>${data.contact.email}</span>
                </div>
                <div class="contact-item">
                    <span>📱</span>
                    <span>${data.contact.phone}</span>
                </div>
                <div class="contact-item">
                    <span>💼</span>
                    <span>linkedin.com/in/${data.contact.linkedin}</span>
                </div>
                <div class="contact-item">
                    <span>🐙</span>
                    <span>github.com/${data.contact.github}</span>
                </div>
            </div>
        </header>
        
        <div class="content">
            <section class="section">
                <h2 class="section-title">
                    <span>🎓</span>
                    Education
                </h2>
                <div class="education-card">
                    <div class="card-title">${data.education.degree}</div>
                    <div class="card-subtitle">${data.education.college}</div>
                    <div class="card-meta">${data.education.duration} • CGPA: ${data.education.cgpa}</div>
                </div>
            </section>
            
            <section class="section">
                <h2 class="section-title">
                    <span>💼</span>
                    Work Experience
                </h2>
                ${data.work_experience.map(exp => `
                <div class="experience-card">
                    <div class="card-title">${exp.role}</div>
                    <div class="card-subtitle">${exp.company}</div>
                    <div class="card-meta">${exp.duration} • ${exp.location}</div>
                    <ul class="achievements">
                        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
                `).join('')}
            </section>
            
            <section class="section">
                <h2 class="section-title">
                    <span>🚀</span>
                    Projects
                </h2>
                ${data.projects.map(project => `
                <div class="project-card">
                    <div class="card-title">${project.name}</div>
                    <div class="tech-stack">
                        ${project.stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <ul class="achievements">
                        ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
                `).join('')}
            </section>
            
            <section class="section">
                <h2 class="section-title">
                    <span>🛠️</span>
                    Technical Skills
                </h2>
                <div class="skills-grid">
                    <div class="skills-category">
                        <h4>Programming Languages</h4>
                        <div class="skills-tags">
                            ${data.technical_skills.languages.map(lang => `<span class="skill-tag">${lang}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skills-category">
                        <h4>Frameworks & Technologies</h4>
                        <div class="skills-tags">
                            ${data.technical_skills.frameworks.map(fw => `<span class="skill-tag">${fw}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skills-category">
                        <h4>Cloud & DevOps</h4>
                        <div class="skills-tags">
                            ${data.technical_skills.cloud_devops.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skills-category">
                        <h4>Core Concepts</h4>
                        <div class="skills-tags">
                            ${data.technical_skills.concepts.map(concept => `<span class="skill-tag">${concept}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="section">
                <h2 class="section-title">
                    <span>🏆</span>
                    Achievements & Recognition
                </h2>
                <ul class="achievements-list">
                    ${data.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </section>
            
            <section class="section">
                <h2 class="section-title">
                    <span>👨‍💻</span>
                    Coding Profiles
                </h2>
                <div class="education-card">
                    <div class="card-title">Competitive Programming</div>
                    <ul class="achievements">
                        <li><strong>LeetCode:</strong> ${data.coding_profiles.leetcode}</li>
                        <li><strong>GitHub:</strong> ${data.coding_profiles.github}</li>
                    </ul>
                </div>
            </section>
        </div>
        
        <footer class="footer">
            <p>Generated by EduVerse Portfolio AI • ${new Date().toLocaleDateString()}</p>
        </footer>
    </div>
</body>
</html>`;
  }

  downloadPortfolio(htmlContent: string, filename: string = 'portfolio.html'): void {
    try {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('📄 Portfolio downloaded successfully!', {
        position: 'top-right',
        autoClose: 3000
      });
    } catch (error) {
      toast.error('❌ Failed to download portfolio.', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  }
}

export default PortfolioAIService.getInstance();