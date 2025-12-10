'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import * as PazzaClient from './client';
import * as CourseClient from '../../../Courses/client';
import ClassAtAGlance from './ClassAtAGlance';

interface PostScreenProps {
  courseId: string;
  selectedPost: any;
  showToggle: boolean;
  onToggle: () => void;
}

export default function PostScreen({ courseId, selectedPost, showToggle, onToggle }: PostScreenProps) {
  const [studentAnswer, setStudentAnswer] = useState<any>(null);
  const [instructorAnswer, setInstructorAnswer] = useState<any>(null);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [studentAnswerText, setStudentAnswerText] = useState('');
  const [instructorAnswerText, setInstructorAnswerText] = useState('');
  const [newDiscussion, setNewDiscussion] = useState('');
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [isEditingInstructor, setIsEditingInstructor] = useState(false);

  // Stats for Class at a Glance
  const [totalPosts, setTotalPosts] = useState(0);
  const [instructorResponses, setInstructorResponses] = useState(0);
  const [studentResponses, setStudentResponses] = useState(0);
  const [studentsEnrolled, setStudentsEnrolled] = useState(0);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const userId = (currentUser as any)?._id;
  const userRole = (currentUser as any)?.role;
  const isInstructor = userRole === 'FACULTY';
  const canEditPost = isInstructor || selectedPost?.authorId === userId;

  // Fetch stats when no post is selected
  useEffect(() => {
    if (!selectedPost) {
      fetchStats();
    }
  }, [selectedPost, courseId]);

  useEffect(() => {
    if (selectedPost?._id) fetchAnswersAndDiscussions();
  }, [selectedPost?._id]);

  const fetchStats = async () => {
    try {
      // Get all posts for this course
      const posts = await PazzaClient.getPostsForCourse(courseId, userId, isInstructor ? 'instructor' : 'student');
      setTotalPosts(posts.length);

      // Count instructor and student responses
      let instructorCount = 0;
      let studentCount = 0;

      for (const post of posts) {
        if (post.type === 'question') {
          const answers = await PazzaClient.getAnswersByPost(post._id);
          instructorCount += answers.filter((a: any) => a.authorRole === 'instructor').length;
          studentCount += answers.filter((a: any) => a.authorRole === 'student').length;
        }
      }

      setInstructorResponses(instructorCount);
      setStudentResponses(studentCount);

      // Get enrolled students
      const users = await CourseClient.findUsersForCourse(courseId);
      const students = users.filter((u: any) => u.role === 'STUDENT');
      setStudentsEnrolled(students.length);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchAnswersAndDiscussions = async () => {
    if (!selectedPost?._id) return;
    try {
      const [studentAns, instructorAns, discs] = await Promise.all([
        PazzaClient.getStudentAnswers(selectedPost._id),
        PazzaClient.getInstructorAnswers(selectedPost._id),
        PazzaClient.getDiscussionsByPost(selectedPost._id)
      ]);

      setStudentAnswer(studentAns[0] || null);
      setStudentAnswerText(studentAns[0]?.content || '');
      setInstructorAnswer(instructorAns[0] || null);
      setInstructorAnswerText(instructorAns[0]?.content || '');
      setDiscussions(discs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSaveStudentAnswer = async () => {
    if (!studentAnswerText.trim()) return;
    try {
      if (studentAnswer) {
        await PazzaClient.updateAnswer(studentAnswer._id, { content: studentAnswerText });
      } else {
        await PazzaClient.createAnswer(selectedPost._id, {
          authorId: userId,
          authorRole: 'student',
          content: studentAnswerText
        });
      }
      setIsEditingStudent(false);
      fetchAnswersAndDiscussions();
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  const handleSaveInstructorAnswer = async () => {
    if (!instructorAnswerText.trim()) return;
    try {
      if (instructorAnswer) {
        await PazzaClient.updateAnswer(instructorAnswer._id, { content: instructorAnswerText });
      } else {
        await PazzaClient.createAnswer(selectedPost._id, {
          authorId: userId,
          authorRole: 'instructor',
          content: instructorAnswerText
        });
      }
      setIsEditingInstructor(false);
      fetchAnswersAndDiscussions();
    } catch (error) {
      console.error('Error saving answer:', error);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm('Delete this post?')) return;
    try {
      await PazzaClient.deletePost(selectedPost._id);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePostDiscussion = async () => {
    if (!newDiscussion.trim()) return;
    try {
      await PazzaClient.createDiscussion(selectedPost._id, {
        authorId: userId,
        content: newDiscussion,
        resolved: false
      });
      setNewDiscussion('');
      fetchAnswersAndDiscussions();
    } catch (error) {
      console.error('Error posting discussion:', error);
    }
  };

  const handleToggleResolved = async (discussionId: string) => {
    try {
      await PazzaClient.toggleDiscussionResolved(discussionId);
      fetchAnswersAndDiscussions();
    } catch (error) {
      console.error('Error toggling resolved:', error);
    }
  };

  const handleDeleteDiscussion = async (discussionId: string) => {
    if (!confirm('Delete this discussion?')) return;
    try {
      await PazzaClient.deleteDiscussion(discussionId);
      fetchAnswersAndDiscussions();
    } catch (error) {
      console.error('Error deleting discussion:', error);
    }
  };

  const handleReplyToDiscussion = async (discussionId: string, replyText: string) => {
    if (!replyText.trim()) return;
    try {
      await PazzaClient.addReplyToDiscussion(discussionId, {
        authorId: userId,
        content: replyText
      });
      fetchAnswersAndDiscussions();
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleReplyToReply = async (discussionId: string, replyId: string, replyText: string) => {
    if (!replyText.trim()) return;
    try {
      await PazzaClient.addNestedReply(discussionId, replyId, {
        authorId: userId,
        content: replyText
      });
      fetchAnswersAndDiscussions();
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  if (!selectedPost) {
    return (
      <div style={{ flex: 1, padding: '32px', backgroundColor: '#f9fafb', overflowY: 'auto' }}>
        {showToggle && (
          <button onClick={onToggle} style={{ marginBottom: '16px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
            ▶ Show Posts List
          </button>
        )}
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Class at a Glance</h2>
        <ClassAtAGlance
          totalPosts={totalPosts}
          instructorResponses={instructorResponses}
          studentResponses={studentResponses}
          studentsEnrolled={studentsEnrolled}
        />
      </div>
    );
  }

  const buttonStyle = { backgroundColor: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' };
  const textareaStyle = { width: '100%', border: '1px solid #d1d5db', borderRadius: '4px', padding: '12px', fontFamily: 'inherit', fontSize: '14px' };

  return (
    <div style={{ flex: 1, padding: '32px', backgroundColor: 'white', overflowY: 'auto' }}>
      {showToggle && (
        <button onClick={onToggle} style={{ marginBottom: '16px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
          ▶ Show Posts List
        </button>
      )}

      {/* Post Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{selectedPost.summary}</h1>
          {canEditPost && (
            <select onChange={(e) => { if (e.target.value === 'delete') handleDeletePost(); e.target.value = ''; }}
              style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              <option value="">Actions</option>
              <option value="edit">Edit</option>
              <option value="delete">Delete</option>
            </select>
          )}
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
          <span>{selectedPost.folders?.join(', ')}</span>
          <span>{selectedPost.authorRole}</span>
          <span>{new Date(selectedPost.createdAt).toLocaleString()}</span>
        </div>
      </div>

      {/* Post Content */}
      <div style={{ marginBottom: '32px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        {selectedPost.details}
      </div>

      {/* Student Answer */}
      {selectedPost.type === 'question' && (
        <>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Student's Answer</h3>
              {!isInstructor && studentAnswer && !isEditingStudent && (
                <button onClick={() => setIsEditingStudent(true)} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
              )}
            </div>
            <textarea
              placeholder={""}
              value={studentAnswerText}
              onChange={(e) => setStudentAnswerText(e.target.value)}
              disabled={isInstructor || (!isEditingStudent && studentAnswer)}
              style={{ ...textareaStyle, minHeight: '100px', backgroundColor: 'white' }}
            />
            {!isInstructor && (isEditingStudent || !studentAnswer) && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <button onClick={handleSaveStudentAnswer} style={buttonStyle}>{studentAnswer ? 'Update' : 'Post'}</button>
                {studentAnswer && (
                  <button onClick={() => { setStudentAnswerText(studentAnswer.content); setIsEditingStudent(false); }}
                    style={{ ...buttonStyle, backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db' }}>Cancel</button>
                )}
              </div>
            )}
          </div>

          {/* Instructor Answer */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Instructor's Answer</h3>
              {isInstructor && instructorAnswer && !isEditingInstructor && (
                <button onClick={() => setIsEditingInstructor(true)} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
              )}
            </div>
            <textarea
              placeholder={""}
              value={instructorAnswerText}
              onChange={(e) => setInstructorAnswerText(e.target.value)}
              disabled={!isInstructor || (!isEditingInstructor && instructorAnswer)}
              style={{ ...textareaStyle, minHeight: '100px', backgroundColor: 'white' }}
            />
            {isInstructor && (isEditingInstructor || !instructorAnswer) && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <button onClick={handleSaveInstructorAnswer} style={buttonStyle}>{instructorAnswer ? 'Update' : 'Post'}</button>
                {instructorAnswer && (
                  <button onClick={() => { setInstructorAnswerText(instructorAnswer.content); setIsEditingInstructor(false); }}
                    style={{ ...buttonStyle, backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db' }}>Cancel</button>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Follow-up Discussion */}
      <div style={{ marginTop: '32px', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Follow-up Discussion</h3>
        <textarea placeholder="Start a discussion..." value={newDiscussion} onChange={(e) => setNewDiscussion(e.target.value)}
          style={{ ...textareaStyle, minHeight: '80px', marginBottom: '8px' }} />
        <button onClick={handlePostDiscussion} style={buttonStyle}>Post</button>

        {/* Discussions */}
        <div style={{ marginTop: '24px' }}>
          {discussions.map(d => (
            <div key={d._id} style={{ padding: '16px', backgroundColor: d.resolved ? '#f0fdf4' : '#f9fafb', borderRadius: '8px', marginBottom: '16px', borderLeft: `4px solid ${d.resolved ? '#22c55e' : '#d1d5db'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button onClick={() => handleToggleResolved(d._id)}
                    style={{ padding: '4px 12px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: d.resolved ? '#22c55e' : 'white', color: d.resolved ? 'white' : '#374151', cursor: 'pointer', fontSize: '12px' }}>
                    {d.resolved ? 'Resolved' : 'Unresolved'}
                  </button>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{new Date(d.createdAt).toLocaleString()}</span>
                </div>
                {(isInstructor || d.authorId === userId) && (
                  <select onChange={(e) => { if (e.target.value === 'delete') handleDeleteDiscussion(d._id); e.target.value = ''; }}
                    style={{ padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }}>
                    <option value="">⋮</option>
                    <option value="delete">Delete</option>
                  </select>
                )}
              </div>
              <div style={{ marginBottom: '12px' }}>{d.content}</div>
              <ReplySection discussionId={d._id} replies={d.replies || []} onReply={handleReplyToDiscussion} onReplyToReply={handleReplyToReply} userId={userId} isInstructor={isInstructor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReplySection({ discussionId, replies, onReply, onReplyToReply, userId, isInstructor }: any) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  const handlePost = async () => {
    if (text.trim()) {
      await onReply(discussionId, text);
      setText('');
      setShowInput(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowInput(!showInput)} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Reply</button>
      {showInput && (
        <div style={{ marginTop: '12px' }}>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Reply..."
            style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '4px', padding: '8px', minHeight: '60px', fontSize: '13px', marginBottom: '8px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handlePost} style={{ backgroundColor: '#2563eb', color: 'white', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Post</button>
            <button onClick={() => { setShowInput(false); setText(''); }}
              style={{ backgroundColor: 'white', color: '#374151', padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
          </div>
        </div>
      )}
      {replies.length > 0 && (
        <div style={{ marginTop: '16px', marginLeft: '24px' }}>
          {replies.map((r: any) => (
            <div key={r._id} style={{ padding: '12px', backgroundColor: 'white', borderRadius: '6px', marginBottom: '12px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{new Date(r.createdAt).toLocaleString()}</div>
              <div style={{ fontSize: '13px', marginBottom: '8px' }}>{r.content}</div>
              <NestedReply discussionId={discussionId} replyId={r._id} replies={r.replies || []} onReplyToReply={onReplyToReply} userId={userId} isInstructor={isInstructor} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NestedReply({ discussionId, replyId, replies, onReplyToReply, userId, isInstructor }: any) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');

  const handlePost = async () => {
    if (text.trim()) {
      await onReplyToReply(discussionId, replyId, text);
      setText('');
      setShowInput(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowInput(!showInput)} style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Reply</button>
      {showInput && (
        <div style={{ marginTop: '12px' }}>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Reply..."
            style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '4px', padding: '8px', minHeight: '50px', fontSize: '12px', marginBottom: '8px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handlePost} style={{ backgroundColor: '#2563eb', color: 'white', padding: '4px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Post</button>
            <button onClick={() => { setShowInput(false); setText(''); }}
              style={{ backgroundColor: 'white', color: '#374151', padding: '4px 10px', borderRadius: '4px', border: '1px solid #d1d5db', cursor: 'pointer', fontSize: '12px' }}>Cancel</button>
          </div>
        </div>
      )}
      {replies.length > 0 && (
        <div style={{ marginTop: '12px', marginLeft: '16px' }}>
          {replies.map((r: any) => (
            <div key={r._id || Math.random()} style={{ padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', marginBottom: '8px', fontSize: '12px' }}>
              <div style={{ color: '#6b7280', marginBottom: '4px' }}>{new Date(r.createdAt).toLocaleString()}</div>
              <div>{r.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}