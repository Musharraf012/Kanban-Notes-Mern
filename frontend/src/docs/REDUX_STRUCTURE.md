# Redux Structure Documentation

The Notes App has been refactored to use **Redux Toolkit** with **Redux Saga** for state management.

## 📁 File Structure

```
src/
├── store.js                    # Redux store configuration
├── slices/
│   └── notesSlice.js          # Notes slice with actions & reducers
├── sagas/
│   ├── notesSaga.js           # Notes async operations
│   └── rootSaga.js            # Root saga configuration
├── selectors/
│   └── notesSelectors.js      # Memoized selectors for data access
└── hooks/
    └── useReduxNotes.js       # Custom hooks for components
```

## 🎯 Actions & Reducers

### Synchronous Actions

- `setViewMode(mode)` - Switch between kanban/list views
- `setSelectedNote(note)` - Set currently selected note
- `clearError()` - Clear error state
- `clearSelectedNote()` - Clear selected note

### Asynchronous Actions (with Saga)

- `addNoteRequest(note)` → `addNoteSuccess(note)` / `addNoteFailure(error)`
- `updateNoteRequest({id, updates})` → `updateNoteSuccess(note)` / `updateNoteFailure(error)`
- `deleteNoteRequest(id)` → `deleteNoteSuccess(id)` / `deleteNoteFailure(error)`
- `moveNoteRequest({id, status})` → `moveNoteSuccess({id, status})` / `moveNoteFailure(error)`

## 🔄 Redux Saga Implementation

### Saga Workers

Each async operation has a corresponding saga worker:

- `addNoteSaga` - Handles note creation
- `updateNoteSaga` - Handles note updates
- `deleteNoteSaga` - Handles note deletion
- `moveNoteSaga` - Handles note status changes

### API Integration

The saga includes mock API functions that can be easily replaced with real API calls:

```javascript
  addNote: async (note) => { /* API call */ },
  updateNote: async (id, updates) => { /* API call */ },
  deleteNote: async (id) => { /* API call */ },
  moveNote: async (id, status) => { /* API call */ }
```

## 🎣 Selectors

### Basic Selectors

- `selectNotes` - All notes
- `selectViewMode` - Current view mode
- `selectLoading` - Loading state
- `selectError` - Error state
- `selectSelectedNote` - Selected note

### Memoized Selectors

- `selectNotesByStatus` - Notes filtered by status
- `selectNotesStats` - Statistics (total, todo, inProgress, done)
- `selectFilteredNotes` - Notes filtered by search/filter criteria
- `selectKanbanData` - Data formatted for Kanban board
- `selectListViewData` - Data formatted for List view

## 🪝 Custom Hooks

### `useReduxNotes()`

Main hook providing all notes functionality:

```javascript
const {
  // State
  notes,
  viewMode,
  loading,
  error,
  selectedNote,
  stats,
  // Actions
  setViewMode,
  addNote,
  updateNote,
  deleteNote,
  moveNote,
  setSelectedNote,
  clearError,
  clearSelectedNote,
  // Utilities
  getNotesByStatus,
} = useReduxNotes();
```

### Specialized Hooks

- `useKanbanData()` - Data for Kanban board
- `useListViewData(filters)` - Data for List view with filters
- `useFilteredNotes(filters)` - Filtered notes
- `useNotesByStatus(status)` - Notes by specific status

## 🔄 Data Flow

1. **Component** dispatches action
2. **Saga** intercepts async action
3. **API** call is made
4. **Success/Failure** action is dispatched
5. **Reducer** updates state
6. **Selector** provides data to component
7. **Component** re-renders with new data

## 🚀 Benefits of Redux Architecture

### 1. **Predictable State Management**

- Single source of truth
- Immutable state updates
- Time-travel debugging

### 2. **Scalable Architecture**

- Easy to add new features
- Clear separation of concerns
- Reusable selectors and hooks

### 3. **Async Operations**

- Centralized side effects with Saga
- Easy error handling
- Loading states management

### 4. **Performance Optimization**

- Memoized selectors prevent unnecessary re-renders
- Efficient data access patterns
- Optimized component updates

### 5. **Developer Experience**

- Redux DevTools integration
- Clear action flow
- Easy testing

## 📈 Performance Considerations

1. **Memoized Selectors** - Prevent unnecessary re-computations
2. **Efficient Updates** - Only update changed data

This Redux architecture provides a solid foundation for scaling the Notes App with complex features and real API integration.
