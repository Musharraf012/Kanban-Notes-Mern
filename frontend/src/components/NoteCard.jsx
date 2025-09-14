import React, { useState } from 'react';
import { useReduxNotes } from '../hooks/useReduxNotes';
import { NOTE_STATUS } from '../slices/notesSlice';
import Card from './ui/Card';
import Button from './ui/Button';
import ConfirmDialog from './ui/ConfirmDialog';

const NoteCard = ({ note, isDragging = false, onEdit, dragListeners }) => {
  const { deleteNote, loading, error } = useReduxNotes();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case NOTE_STATUS.TODO:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case NOTE_STATUS.IN_PROGRESS:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case NOTE_STATUS.DONE:
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (title) => {
    if (title.toLowerCase().includes('important') || title.toLowerCase().includes('urgent')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (title.toLowerCase().includes('high')) {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    }
    if (title.toLowerCase().includes('low') || title.toLowerCase().includes('meh')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityLabel = (title) => {
    if (title.toLowerCase().includes('important') || title.toLowerCase().includes('urgent')) {
      return 'Important';
    }
    if (title.toLowerCase().includes('high')) {
      return 'High';
    }
    if (title.toLowerCase().includes('low') || title.toLowerCase().includes('meh')) {
      return 'Low';
    }
    return 'Normal';
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteNote(note.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(note);
    }
  };

  return (
    <Card 
      className={`
        group relative cursor-pointer transition-all duration-200
        ${isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md hover:border-gray-300'}
        ${note.status === NOTE_STATUS.DONE ? 'opacity-90' : ''}
      `}
      padding="md"
    >
      {/* Priority Badge and Action Buttons */}
      <div className="flex items-center justify-between mb-3">
        <span className={`
          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
          ${getPriorityColor(note.title)}
        `}>
          {getPriorityLabel(note.title)}
        </span>
        
        {/* Action Buttons */}
        <div className="flex space-x-1">
          <button
            onClick={handleEdit}
            disabled={loading}
            className="p-1.5 h-7 w-7 rounded-md hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            title="Edit note"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-1.5 h-7 w-7 rounded-md hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete note"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Title with Drag Handle */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
          {note.title}
        </h3>
        {dragListeners && (
          <div 
            {...dragListeners}
            className="ml-2 p-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
            title="Drag to move"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {note.description}
      </p>

      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <span className={`
          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border
          ${getStatusColor(note.status)}
        `}>
          {note.status}
        </span>
        
        {/* Progress indicator for In Progress notes */}
        {note.status === NOTE_STATUS.IN_PROGRESS && (
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-gray-200 rounded-full h-1.5">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '52%' }}></div>
            </div>
            <span className="text-xs text-gray-500">52%</span>
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>11</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>187</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-400">
          {new Date(note.updatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Note"
        message={`Are you sure you want to delete "${note.title}"? This action cannot be undone.`}
        confirmText={loading ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        type="danger"
      />

      {/* Error Display */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default NoteCard;
