import { createSlice } from '@reduxjs/toolkit';

// Note status constants
export const NOTE_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
};

// Initial state
const initialState = {
  notes: [],
  viewMode: 'kanban', // 'kanban' or 'list'
  loading: false,
  error: null,
  selectedNote: null
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    // View mode actions
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    getNoteRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getNoteSuccess: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    getNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Note CRUD actions
    addNoteRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    addNoteSuccess: (state, action) => {
      state.loading = false;
      state.notes.push({
        ...action.payload,
        id: action.payload.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    },
    addNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateNoteRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateNoteSuccess: (state, action) => {
      state.loading = false;
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    updateNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteNoteRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteNoteSuccess: (state, action) => {
      state.loading = false;
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    deleteNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    moveNoteRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    moveNoteSuccess: (state, action) => {
      state.loading = false;
      const { id, status } = action.payload;
      const index = state.notes.findIndex(note => note.id === id);
      if (index !== -1) {
        state.notes[index] = {
          ...state.notes[index],
          status,
          updatedAt: new Date().toISOString()
        };
      }
    },
    moveNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Utility actions
    setSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    }
  }
});

// Export actions
export const {
  setViewMode,
  getNoteRequest,
  getNoteSuccess,
  getNoteFailure,
  addNoteRequest,
  addNoteSuccess,
  addNoteFailure,
  updateNoteRequest,
  updateNoteSuccess,
  updateNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
  moveNoteRequest,
  moveNoteSuccess,
  moveNoteFailure,
  setSelectedNote,
  clearError,
  clearSelectedNote
} = notesSlice.actions;

// Export reducer
export default notesSlice.reducer;
