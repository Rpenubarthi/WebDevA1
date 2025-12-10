'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function PazzaNavBar({ courseId }: { courseId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = "Jose Annunziato";
  const courseName = "CS5610";

  const isActive = (path: string) => pathname.includes(path);

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
            backgroundColor: isActive('/Pazza') && !isActive('/Manage') ? '#1d4ed8' : 'transparent',
            fontWeight: isActive('/Pazza') && !isActive('/Manage') ? '600' : 'normal',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
          onClick={() => router.push(`/Kambaz/Courses/${courseId}/Pazza`)}
        >
          Q&A
        </button>
        
        <button style={{ color: '#93c5fd', cursor: 'not-allowed', border: 'none', background: 'none' }} disabled>
          Resources
        </button>
        
        <button style={{ color: '#93c5fd', cursor: 'not-allowed', border: 'none', background: 'none' }} disabled>
          Statistics
        </button>
        
        <button 
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            backgroundColor: isActive('/Manage') ? '#1d4ed8' : 'transparent',
            fontWeight: isActive('/Manage') ? '600' : 'normal',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
          onClick={() => router.push(`/Kambaz/Courses/${courseId}/Pazza/Manage`)}
        >
          Manage Class
        </button>
      </div>
      
      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: '500' }}>{currentUser}</span>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>
          JA
        </div>
      </div>
    </div>
  );
}