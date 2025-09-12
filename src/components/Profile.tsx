import React from 'react';
import { useAuthStore } from '../store/authStore';
import StudentProfile from './StudentProfile';
import FacultyProfile from './FacultyProfile';
import OrganizationProfile from './OrganizationProfile';

const Profile: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Please login to view profile</div>;
  }

  switch (user.role) {
    case 'student':
      return <StudentProfile />;
    case 'faculty':
      return <FacultyProfile />;
    case 'organization':
      return <OrganizationProfile />;
    default:
      return <div>Invalid user role</div>;
  }
};

export default Profile;
