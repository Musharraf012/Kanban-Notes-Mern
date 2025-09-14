import { call, put, takeEvery } from 'redux-saga/effects';
import {
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
  getNoteSuccess,
  getNoteFailure,
  getNoteRequest
} from '../slices/notesSlice';
import { createNote, deleteNote, getNotes, updateNote } from '../api/notesAPi';

// Saga workers
function* getNoteSaga(action) {
  try {
    const response = yield call(getNotes);
    // Handle the response structure from your API
    const notes = response || [];
    yield put(getNoteSuccess(notes));
  } catch (error) {
    yield put(getNoteFailure(error.message || 'Failed to fetch notes'));
  }
}

function* addNoteSaga(action) {
  try {
    const response = yield call(createNote, action.payload);
    // Extract the note data from your API response structure
    const newNote = response?.data || response;
    yield put(addNoteSuccess(newNote));
  } catch (error) {
    yield put(addNoteFailure(error.message || 'Failed to add note'));
  }
}

function* updateNoteSaga(action) {
  try {
    const { id, updates } = action.payload;

    const response = yield call(updateNote, id, updates);
    const updatedNote = {
      id,
      ...updates,
      ...(response?.data || response),
      updatedAt: new Date().toISOString()
    };

    yield put(updateNoteSuccess(updatedNote));
  } catch (error) {
    yield put(updateNoteFailure(error.message || 'Failed to update note'));
  }
}

function* deleteNoteSaga(action) {
  try {
    const noteId = action.payload;
    yield call(deleteNote, noteId);

    // Pass the ID to the success action
    yield put(deleteNoteSuccess(noteId));
  } catch (error) {
    yield put(deleteNoteFailure(error.message || 'Failed to delete note'));
  }
}

function* moveNoteSaga(action) {
  try {
    const { id, status } = action.payload;
    // Update the note's status via the API
    const response = yield call(updateNote, id, { status });
    const updatedNote = {
      id,
      ...status,
      ...(response?.data || response),
      updatedAt: new Date().toISOString()
    };

    yield put(updateNoteSuccess(updatedNote));
  } catch (error) {
    yield put(moveNoteFailure(error.message || 'Failed to move note'));
  }
}

export function* watchNote() {
  yield takeEvery(getNoteRequest.type, getNoteSaga);
  yield takeEvery(addNoteRequest.type, addNoteSaga);
  yield takeEvery(updateNoteRequest.type, updateNoteSaga);
  yield takeEvery(deleteNoteRequest.type, deleteNoteSaga);
  yield takeEvery(moveNoteRequest.type, moveNoteSaga);
}