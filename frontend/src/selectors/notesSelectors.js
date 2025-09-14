import { createSelector } from '@reduxjs/toolkit';
import { NOTE_STATUS } from '../slices/notesSlice';

// Basic selectors
export const selectNotes = (state) => state.notes.notes;
export const selectViewMode = (state) => state.notes.viewMode;
export const selectLoading = (state) => state.notes.loading;
export const selectError = (state) => state.notes.error;
export const selectSelectedNote = (state) => state.notes.selectedNote;

// Memoized selectors
export const selectNotesByStatus = createSelector(
  [selectNotes, (state, status) => status],
  (notes, status) => notes.filter(note => note.status === status)
);

export const selectNotesByStatusMemoized = createSelector(
  [selectNotes],
  (notes) => ({
    [NOTE_STATUS.TODO]: notes.filter(note => note.status === NOTE_STATUS.TODO),
    [NOTE_STATUS.IN_PROGRESS]: notes.filter(note => note.status === NOTE_STATUS.IN_PROGRESS),
    [NOTE_STATUS.DONE]: notes.filter(note => note.status === NOTE_STATUS.DONE)
  })
);

export const selectNotesStats = createSelector(
  [selectNotes],
  (notes) => {
    const total = notes.length;
    const todo = notes.filter(note => note.status === NOTE_STATUS.TODO).length;
    const inProgress = notes.filter(note => note.status === NOTE_STATUS.IN_PROGRESS).length;
    const done = notes.filter(note => note.status === NOTE_STATUS.DONE).length;

    return {
      total,
      todo,
      inProgress,
      done
    };
  }
);

export const selectFilteredNotes = createSelector(
  [selectNotes, (state, filters) => filters],
  (notes, filters) => {
    const { searchTerm = '', statusFilter = 'all' } = filters || {};

    return notes.filter(note => {
      const matchesSearch = !searchTerm ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || note.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }
);

export const selectNoteById = createSelector(
  [selectNotes, (state, id) => id],
  (notes, id) => notes.find(note => note.id === id)
);

// Complex selectors for UI components
export const selectKanbanData = createSelector(
  [selectNotesByStatusMemoized],
  (notesByStatus) => [
    {
      status: NOTE_STATUS.TODO,
      notes: notesByStatus[NOTE_STATUS.TODO],
      count: notesByStatus[NOTE_STATUS.TODO].length
    },
    {
      status: NOTE_STATUS.IN_PROGRESS,
      notes: notesByStatus[NOTE_STATUS.IN_PROGRESS],
      count: notesByStatus[NOTE_STATUS.IN_PROGRESS].length
    },
    {
      status: NOTE_STATUS.DONE,
      notes: notesByStatus[NOTE_STATUS.DONE],
      count: notesByStatus[NOTE_STATUS.DONE].length
    }
  ]
);

export const selectListViewData = createSelector(
  [selectNotes, selectFilteredNotes],
  (allNotes, filteredNotes) => ({
    allNotes,
    filteredNotes,
    hasFilters: filteredNotes.length !== allNotes.length
  })
);
