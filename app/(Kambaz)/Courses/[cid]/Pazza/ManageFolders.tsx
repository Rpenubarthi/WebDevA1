'use client';

import { useState, useEffect } from 'react';
import * as PazzaClient from './client';

interface ManageFoldersProps {
    courseId: string;
}

export default function ManageFolders({ courseId }: ManageFoldersProps) {
    const [folders, setFolders] = useState<any[]>([]);
    const [newFolderName, setNewFolderName] = useState('');
    const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
    const [editingFolderName, setEditingFolderName] = useState('');
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFolders();
    }, [courseId]);

    const fetchFolders = async () => {
        try {
            const fetchedFolders = await PazzaClient.getFoldersByCourse(courseId);
            setFolders(fetchedFolders);
        } catch (error) {
            console.error('Error fetching folders:', error);
        }
    };

    const handleAddFolder = async () => {
        if (!newFolderName.trim()) {
            alert('Folder name cannot be empty');
            return;
        }

        try {
            setLoading(true);
            await PazzaClient.createFolder(courseId, { name: newFolderName });
            setNewFolderName('');
            fetchFolders();
        } catch (error) {
            console.error('Error adding folder:', error);
            alert('Failed to add folder');
        } finally {
            setLoading(false);
        }
    };

    const handleEditFolder = (folderId: string, currentName: string) => {
        setEditingFolderId(folderId);
        setEditingFolderName(currentName);
    };

    const handleSaveFolder = async (folderId: string) => {
        if (!editingFolderName.trim()) {
            alert('Folder name cannot be empty');
            return;
        }

        try {
            await PazzaClient.updateFolder(folderId, { name: editingFolderName });
            setEditingFolderId(null);
            setEditingFolderName('');
            fetchFolders();
        } catch (error) {
            console.error('Error updating folder:', error);
            alert('Failed to update folder');
        }
    };

    const handleCancelEdit = () => {
        setEditingFolderId(null);
        setEditingFolderName('');
    };

    const handleToggleSelect = (folderId: string) => {
        if (selectedFolders.includes(folderId)) {
            setSelectedFolders(selectedFolders.filter(id => id !== folderId));
        } else {
            setSelectedFolders([...selectedFolders, folderId]);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedFolders.length === 0) {
            alert('No folders selected');
            return;
        }

        if (!confirm(`Delete ${selectedFolders.length} folder(s)?`)) return;

        try {
            setLoading(true);
            await PazzaClient.deleteManyFolders(selectedFolders);
            setSelectedFolders([]);
            fetchFolders();
        } catch (error) {
            console.error('Error deleting folders:', error);
            alert('Failed to delete folders');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Manage Folders</h3>

            {/* Add Folder */}
            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
                    Add New Folder
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        placeholder="Enter folder name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                    <button
                        onClick={handleAddFolder}
                        disabled={loading}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Add Folder
                    </button>
                </div>
            </div>

            {/* Delete Selected */}
            {selectedFolders.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                    <button
                        onClick={handleDeleteSelected}
                        disabled={loading}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Delete Selected ({selectedFolders.length})
                    </button>
                </div>
            )}

            {/* Folders List */}
            <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px' }}>
                    Folders
                </label>

                {folders.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#6b7280', backgroundColor: '#f9fafb', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                        No folders yet. Add one above.
                    </div>
                ) : (
                    folders.map(folder => (
                        <div
                            key={folder._id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 12px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                marginBottom: '8px',
                                backgroundColor: selectedFolders.includes(folder._id) ? '#dbeafe' : 'white'
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedFolders.includes(folder._id)}
                                onChange={() => handleToggleSelect(folder._id)}
                            />

                            {editingFolderId === folder._id ? (
                                <input
                                    type="text"
                                    value={editingFolderName}
                                    onChange={(e) => setEditingFolderName(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSaveFolder(folder._id)}
                                    style={{
                                        flex: 1,
                                        padding: '6px 10px',
                                        border: '2px solid #2563eb',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span style={{ flex: 1, fontSize: '14px' }}>{folder.name}</span>
                            )}

                            <div style={{ display: 'flex', gap: '8px' }}>
                                {editingFolderId === folder._id ? (
                                    <>
                                        <button onClick={() => handleSaveFolder(folder._id)}
                                            style={{ padding: '6px 12px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
                                            Save
                                        </button>
                                        <button onClick={handleCancelEdit}
                                            style={{ padding: '6px 12px', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditFolder(folder._id, folder.name)}
                                        style={{ padding: '6px 12px', backgroundColor: 'white', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}