/* eslint-disable */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import * as courseClient from '../../../Courses/client';

export default function PazzaNavBar({
  courseId,
  viewMode,
  onChangeView
}: {
  courseId: string;
  viewMode?: 'qa' | 'manage';
  onChangeView?: (mode: 'qa' | 'manage') => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [courseName, setCourseName] = useState('Loading...');

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isInstructor = (currentUser as any)?.role === 'FACULTY';

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await courseClient.fetchAllCourses();
        const course = courses.find((c: any) => c._id === courseId);
        if (course) {
          setCourseName(course.name || course.number || courseId);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setCourseName(courseId);
      }
    };

    fetchCourse();
  }, [courseId]);

  const isActive = (path: string) => pathname.includes(path);

  const getUserInitials = () => {
    if (!currentUser) return '?';
    const firstName = (currentUser as any).firstName || '';
    const lastName = (currentUser as any).lastName || '';
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    return initials || (currentUser as any).username?.charAt(0).toUpperCase() || '?';
  };

  const getUserDisplayName = () => {
    if (!currentUser) return 'Guest';
    const fullName = `${(currentUser as any).firstName || ''} ${(currentUser as any).lastName || ''}`.trim();
    return fullName || (currentUser as any).username || 'User';
  };

  return (
    <div
      style={{
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '24px' }}>pazza</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontWeight: '600' }}>{courseName}</span>
        </div>
      </div>

      {/* Center */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            backgroundColor: viewMode === 'qa' ? '#1d4ed8' : 'transparent',
            fontWeight: viewMode === 'qa' ? '600' : 'normal',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
          onClick={() => onChangeView?.('qa')}
        >
          Q&A
        </button>

        <button style={{ color: '#93c5fd', cursor: 'not-allowed', border: 'none', background: 'none' }} disabled>
          Resources
        </button>

        <button style={{ color: '#93c5fd', cursor: 'not-allowed', border: 'none', background: 'none' }} disabled>
          Statistics
        </button>

        {isInstructor && (
          <button
            style={{
              padding: '4px 12px',
              borderRadius: '4px',
              backgroundColor: viewMode === 'manage' ? '#1d4ed8' : 'transparent',
              fontWeight: viewMode === 'manage' ? '600' : 'normal',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
            onClick={() => onChangeView?.('manage')}
          >
            Manage Class
          </button>
        )}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: '500' }}>{getUserDisplayName()}</span>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          {getUserInitials()}
        </div>
      </div>
    </div>
  );
}