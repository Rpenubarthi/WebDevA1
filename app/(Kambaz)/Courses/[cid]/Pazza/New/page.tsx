'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import PazzaNavBar from '../PazzaNavBar';
import * as PazzaClient from '../client';
import * as FolderClient from '../client';
import * as CourseClient from '../../../../Courses/client';

export default function NewPostPage({ params }: { params: Promise<{ cid: string }> }) {
  const router = useRouter();
  const { cid } = use(params);

  const [postType, setPostType] = useState<'question' | 'note'>('question');
  const [postTo, setPostTo] = useState<'entire_class' | 'individual'>('entire_class');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedFolders, setSelectedFolders] = useState<string[]>(['hw1']);
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [availableFolders, setAvailableFolders] = useState<string[]>([]);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Get current user from Redux
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  // Fetch folders for this course
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folders = await FolderClient.getFoldersByCourse(cid);
        const folderNames = folders.map((f: any) => f.name);
        setAvailableFolders(folderNames.length > 0 ? folderNames : ['hw1', 'hw2', 'hw3', 'project', 'exam', 'logistics', 'other', 'office_hours']);
      } catch (error) {
        console.error('Error fetching folders:', error);
        setAvailableFolders(['hw1', 'hw2', 'hw3', 'project', 'exam', 'logistics', 'other', 'office_hours']);
      }
    };
    fetchFolders();
  }, [cid]);

  // Fetch users for this course when "individual" is selected
  useEffect(() => {
    const fetchUsers = async () => {
      if (postTo !== 'individual') return;

      try {
        setLoadingUsers(true);
        const users = await CourseClient.findUsersForCourse(cid);

        // Separate instructors and students
        const instructors = users.filter((u: any) => u.role === 'FACULTY');
        const students = users.filter((u: any) => u.role === 'STUDENT');

        // Format users for display
        const formattedUsers = [
          // Add "All Instructors" group option if there are any instructors
          ...(instructors.length > 0 ? [{
            id: 'all-instructors',
            name: 'All Instructors',
            role: 'instructor',
            isGroup: true,
            userIds: instructors.map((i: any) => i._id)
          }] : []),
          // Add individual instructors
          ...instructors.map((u: any) => ({
            id: u._id,
            name: `${u.firstName} ${u.lastName}`.trim() || u.username,
            role: 'instructor',
            isGroup: false
          })),
          // Add individual students
          ...students.map((u: any) => ({
            id: u._id,
            name: `${u.firstName} ${u.lastName}`.trim() || u.username,
            role: 'student',
            isGroup: false
          }))
        ];

        setAvailableUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setAvailableUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [cid, postTo]);

  const handleFolderToggle = (folder: string) => {
    if (selectedFolders.includes(folder)) {
      setSelectedFolders(selectedFolders.filter(f => f !== folder));
    } else {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  const handleUserToggle = (userId: string) => {
    const user = availableUsers.find(u => u.id === userId);

    // Handle "All Instructors" group selection
    if (user?.isGroup) {
      const allInstructorIds = user.userIds;
      const allSelected = allInstructorIds.every((id: string) => selectedUsers.includes(id));

      if (allSelected) {
        // Deselect all instructors
        setSelectedUsers(selectedUsers.filter(id => !allInstructorIds.includes(id)));
      } else {
        // Select all instructors
        const newSelection = [...new Set([...selectedUsers, ...allInstructorIds])];
        setSelectedUsers(newSelection);
      }
    } else {
      // Handle individual user selection
      if (selectedUsers.includes(userId)) {
        setSelectedUsers(selectedUsers.filter(u => u !== userId));
      } else {
        setSelectedUsers([...selectedUsers, userId]);
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!summary.trim()) {
      newErrors.summary = 'Summary is required';
    } else if (summary.length > 100) {
      newErrors.summary = 'Summary must be 100 characters or less';
    }

    if (!details.trim()) {
      newErrors.details = 'Details are required';
    }

    if (selectedFolders.length === 0) {
      newErrors.folders = 'At least one folder is required';
    }

    if (postTo === 'individual' && selectedUsers.length === 0) {
      newErrors.users = 'At least one user must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (!currentUser) {
      alert('You must be logged in to create a post');
      return;
    }

    setLoading(true);

    const postData = {
      courseId: cid,
      type: postType,
      summary,
      details,
      authorId: (currentUser as any)._id,
      authorRole: (currentUser as any).role === 'FACULTY' ? 'instructor' : 'student',
      visibility: {
        type: postTo,
        visibleTo: postTo === 'individual' ? selectedUsers : []
      },
      folders: selectedFolders
    };

    try {
      await PazzaClient.createPost(cid, postData);
      console.log('Post created successfully!');

      router.push(`/Courses/${cid}/Pazza`);
      router.refresh();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Pazza`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%'
    }}>
      <PazzaNavBar courseId={cid} />

      <div style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#f9fafb',
        padding: '32px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px'
          }}>
            Create New Post
          </h2>

          {/* Post Type Tabs */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Post Type
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setPostType('question')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: postType === 'question' ? '#2563eb' : 'white',
                  color: postType === 'question' ? 'white' : '#374151',
                  fontWeight: postType === 'question' ? '600' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Question
              </button>
              <button
                onClick={() => setPostType('note')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  backgroundColor: postType === 'note' ? '#2563eb' : 'white',
                  color: postType === 'note' ? 'white' : '#374151',
                  fontWeight: postType === 'note' ? '600' : 'normal',
                  cursor: 'pointer'
                }}
              >
                Note
              </button>
            </div>
          </div>

          {/* Post To */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Post To (Who can see this?)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="postTo"
                  checked={postTo === 'entire_class'}
                  onChange={() => setPostTo('entire_class')}
                />
                <span>Entire Class (everyone can see)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="postTo"
                  checked={postTo === 'individual'}
                  onChange={() => setPostTo('individual')}
                />
                <span>Individual Students/Instructors (only selected people can see)</span>
              </label>
            </div>

            {/* User Selection */}
            {postTo === 'individual' && (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                backgroundColor: '#ffffffff',
                borderRadius: '4px',
                border: '1px solid #000000ff'
              }}>

                {loadingUsers ? (
                  <div style={{ padding: '8px', textAlign: 'center', color: '#6b7280' }}>
                    Loading users...
                  </div>
                ) : availableUsers.length === 0 ? (
                  <div style={{ padding: '8px', color: '#6b7280' }}>
                    No users found in this course.
                  </div>
                ) : (
                  availableUsers.map(user => {
                    const isChecked = user.isGroup
                      ? user.userIds.every((id: string) => selectedUsers.includes(id))
                      : selectedUsers.includes(user.id);

                    return (
                      <label key={user.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '6px',
                        fontWeight: user.isGroup ? '600' : 'normal'
                      }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleUserToggle(user.id)}
                        />
                        <span style={{ fontSize: '14px' }}>
                          {user.name} {user.role === 'instructor' && !user.isGroup && '(Instructor)'}
                        </span>
                      </label>
                    );
                  })
                )}

                {errors.users && (
                  <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                    {errors.users}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Select Folders */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Select Folder(s) *
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '4px',
              border: errors.folders ? '1px solid #dc2626' : '1px solid #e5e7eb'
            }}>
              {availableFolders.map(folder => (
                <button
                  key={folder}
                  onClick={() => handleFolderToggle(folder)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #d1d5db',
                    backgroundColor: selectedFolders.includes(folder) ? '#2563eb' : 'white',
                    color: selectedFolders.includes(folder) ? 'white' : '#374151',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {folder}
                </button>
              ))}
            </div>
            {errors.folders && (
              <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                {errors.folders}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              At least one folder is required
            </div>
          </div>

          {/* Summary */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Summary *
            </label>
            <input
              type="text"
              placeholder="Brief summary of your question or note (max 100 characters)"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              maxLength={100}
              style={{
                width: '100%',
                padding: '10px',
                border: errors.summary ? '1px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px'
            }}>
              {errors.summary ? (
                <div style={{ color: '#dc2626', fontSize: '14px' }}>
                  {errors.summary}
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Required
                </div>
              )}
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {summary.length}/100
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Details *
            </label>
            <textarea
              placeholder="Enter the full details of your question or note..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '10px',
                border: errors.details ? '1px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            {errors.details && (
              <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                {errors.details}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={handleCancel}
              disabled={loading}
              style={{
                padding: '10px 20px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#374151',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                opacity: loading ? 0.5 : 1
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#2563eb',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Posting...' : `Post My ${postType === 'question' ? 'Question' : 'Note'}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}