import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  setViewMode,
  addNoteRequest,
  updateNoteRequest,
  deleteNoteRequest,
  moveNoteRequest,
  setSelectedNote,
  clearError,
  clearSelectedNote,
  getNoteRequest
} from '../slices/notesSlice';
import {
  selectNotes,
  selectViewMode,
  selectLoading,
  selectError,
  selectSelectedNote,
  selectNotesStats,
  selectNotesByStatus,
  selectFilteredNotes,
  selectKanbanData,
  selectListViewData
} from '../selectors/notesSelectors';

// Main hook for notes management
export const useReduxNotes = () => {
  const dispatch = useDispatch();

  // Selectors
  const notes = useSelector(selectNotes);
  const viewMode = useSelector(selectViewMode);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedNote = useSelector(selectSelectedNote);
  const stats = useSelector(selectNotesStats);

  // Actions
  const setViewModeAction = useCallback((mode) => {
    dispatch(setViewMode(mode));
  }, [dispatch]);

  const getAllNotes = useCallback(() => {
    dispatch(getNoteRequest());
  }, [dispatch]);

  const addNote = useCallback((note) => {
    dispatch(addNoteRequest(note));
  }, [dispatch]);

  const updateNote = useCallback((id, updates) => {
    dispatch(updateNoteRequest({ id, updates }));
  }, [dispatch]);

  const deleteNote = useCallback((id) => {
    dispatch(deleteNoteRequest(id));
  }, [dispatch]);

  const moveNote = useCallback((id, status) => {
    dispatch(moveNoteRequest({ id, status }));
  }, [dispatch]);

  const setSelectedNoteAction = useCallback((note) => {
    dispatch(setSelectedNote(note));
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearSelectedNoteAction = useCallback(() => {
    dispatch(clearSelectedNote());
  }, [dispatch]);

  // Utility functions
  const getNotesByStatus = useCallback((status) => {
    return notes.filter(note => note.status === status);
  }, [notes]);

  return {
    // State
    notes,
    viewMode,
    loading,
    error,
    selectedNote,
    stats,

    // Actions
    setViewMode: setViewModeAction,
    addNote,
    getAllNotes,
    updateNote,
    deleteNote,
    moveNote,
    setSelectedNote: setSelectedNoteAction,
    clearError: clearErrorAction,
    clearSelectedNote: clearSelectedNoteAction,

    // Utilities
    getNotesByStatus
  };
};

// Hook for Kanban board
export const useKanbanData = () => {
  const kanbanData = useSelector(selectKanbanData);
  const loading = useSelector(selectLoading);

  return {
    kanbanData,
    loading
  };
};

// Hook for List view
export const useListViewData = (filters = {}) => {
  const listViewData = useSelector(state => selectListViewData(state, filters));
  const loading = useSelector(selectLoading);

  return {
    ...listViewData,
    loading
  };
};

// Hook for filtered notes
export const useFilteredNotes = (filters = {}) => {
  const filteredNotes = useSelector(state => selectFilteredNotes(state, filters));
  const loading = useSelector(selectLoading);

  return {
    filteredNotes,
    loading
  };
};

// Hook for notes by status
export const useNotesByStatus = (status) => {
  const notes = useSelector(state => selectNotesByStatus(state, status));
  const loading = useSelector(selectLoading);

  return {
    notes,
    loading
  };
};
