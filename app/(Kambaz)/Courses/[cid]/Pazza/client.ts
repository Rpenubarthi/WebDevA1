/* eslint-disable */
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API_BASE = `${HTTP_SERVER}/api`;

// Posts API

export const createPost = async (courseId: string, post: any) => {
    const { data } = await axiosWithCredentials.post(`${API_BASE}/courses/${courseId}/posts`, post);
    return data;
};

export const getPostsForCourse = async (courseId: string, userId: string, userRole: string, folder?: string, search?: string) => {
    const params = new URLSearchParams({ userId, userRole });
    if (folder) params.append('folder', folder);
    if (search) params.append('search', search);
    
    const { data } = await axios.get(`${API_BASE}/courses/${courseId}/posts?${params}`);
    return data;
};

export const getPostById = async (postId: string) => {
    const { data } = await axios.get(`${API_BASE}/posts/${postId}`);
    return data;
};

export const updatePost = async (postId: string, post: any) => {
    const { data } = await axiosWithCredentials.put(`${API_BASE}/posts/${postId}`, post);
    return data;
};

export const deletePost = async (postId: string) => {
    const { data } = await axiosWithCredentials.delete(`${API_BASE}/posts/${postId}`);
    return data;
};

// Answers API

export const createAnswer = async (postId: string, answer: any) => {
    const { data } = await axiosWithCredentials.post(`${API_BASE}/posts/${postId}/answers`, answer);
    return data;
};

export const getAnswersByPost = async (postId: string, role?: 'student' | 'instructor') => {
    const params = role ? `?role=${role}` : '';
    const { data } = await axios.get(`${API_BASE}/posts/${postId}/answers${params}`);
    return data;
};

export const getStudentAnswers = async (postId: string) => {
    return getAnswersByPost(postId, 'student');
};

export const getInstructorAnswers = async (postId: string) => {
    return getAnswersByPost(postId, 'instructor');
};

export const updateAnswer = async (answerId: string, answer: any) => {
    const { data } = await axiosWithCredentials.put(`${API_BASE}/answers/${answerId}`, answer);
    return data;
};

export const deleteAnswer = async (answerId: string) => {
    const { data } = await axiosWithCredentials.delete(`${API_BASE}/answers/${answerId}`);
    return data;
};

// Discussion API

export const createDiscussion = async (postId: string, discussion: any) => {
    const { data } = await axiosWithCredentials.post(`${API_BASE}/posts/${postId}/discussions`, discussion);
    return data;
};

export const getDiscussionsByPost = async (postId: string) => {
    const { data } = await axios.get(`${API_BASE}/posts/${postId}/discussions`);
    return data;
};

export const updateDiscussion = async (discussionId: string, discussion: any) => {
    const { data } = await axiosWithCredentials.put(`${API_BASE}/discussions/${discussionId}`, discussion);
    return data;
};

export const deleteDiscussion = async (discussionId: string) => {
    const { data } = await axiosWithCredentials.delete(`${API_BASE}/discussions/${discussionId}`);
    return data;
};

export const toggleDiscussionResolved = async (discussionId: string) => {
    const { data } = await axiosWithCredentials.patch(`${API_BASE}/discussions/${discussionId}/toggle-resolved`);
    return data;
};

export const addReplyToDiscussion = async (discussionId: string, reply: any) => {
    const { data } = await axiosWithCredentials.post(`${API_BASE}/discussions/${discussionId}/replies`, reply);
    return data;
};

export const addNestedReply = async (discussionId: string, replyId: string, nestedReply: any) => {
    const { data } = await axiosWithCredentials.post(`${API_BASE}/discussions/${discussionId}/replies/${replyId}/replies`, nestedReply);
    return data;
};

// Folders API

export const createFolder = async (courseId: string, folder: any) => {
    const { data } = await axiosWithCredentials.post(`${API_BASE}/courses/${courseId}/folders`, folder);
    return data;
};

export const getFoldersByCourse = async (courseId: string) => {
    const { data } = await axios.get(`${API_BASE}/courses/${courseId}/folders`);
    return data;
};

export const updateFolder = async (folderId: string, folder: any) => {
    const { data } = await axiosWithCredentials.put(`${API_BASE}/folders/${folderId}`, folder);
    return data;
};

export const deleteFolder = async (folderId: string) => {
    const { data } = await axiosWithCredentials.delete(`${API_BASE}/folders/${folderId}`);
    return data;
};

export const deleteManyFolders = async (folderIds: string[]) => {
    const { data } = await axiosWithCredentials.post(`${API_BASE}/folders/delete-many`, { folderIds });
    return data;
};