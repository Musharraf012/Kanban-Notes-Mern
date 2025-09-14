import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { useReduxNotes } from "./hooks/useReduxNotes";
import KanbanBoard from "./components/KanbanBoard";
import ListView from "./components/ListView";
import NoteForm from "./components/NoteForm";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Toast from "./components/ui/Toast";
import store from "./store";
import "./App.css";

function AppContent() {
  const {
    viewMode,
    setViewMode,
    getAllNotes,
    notes,
    loading,
    error,
    clearError,
  } = useReduxNotes();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });
  console.log("notes", notes);

  const handleAddNote = (status = null) => {
    setNoteToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setNoteToEdit(null);
  };

  // Show toast notifications
  useEffect(() => {
    if (error) {
      setToast({
        isVisible: true,
        message: error,
        type: "error",
      });
    }
  }, [error]);

  // Show success toast when operations complete
  useEffect(() => {
    if (!loading && !error && notes.length > 0) {
      // This is a simple way to detect successful operations
      // In a real app, you'd listen to specific success actions
    }
  }, [loading, error, notes.length]);

  const showToast = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
    clearError();
  };

  const totalNotes = notes.length;
  const todoCount = notes.filter((note) => note.status === "To Do").length;
  const inProgressCount = notes.filter(
    (note) => note.status === "In Progress"
  ).length;
  const doneCount = notes.filter((note) => note.status === "Done").length;

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Notes App</h1>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "kanban" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("kanban")}
                  className="px-3 py-1"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
                    />
                  </svg>
                  Kanban
                </Button>
                <Button
                  variant={viewMode === "list" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3 py-1"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  List
                </Button>
              </div>

              <button
                onClick={() => handleAddNote()}
                className="ml-2 p-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center"
                title="Add new note"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {totalNotes}
              </div>
              <div className="text-sm text-gray-500">Total Notes</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {todoCount}
              </div>
              <div className="text-sm text-gray-500">To Do</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {inProgressCount}
              </div>
              <div className="text-sm text-gray-500">In Progress</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {doneCount}
              </div>
              <div className="text-sm text-gray-500">Done</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewMode === "kanban" ? (
          <KanbanBoard onEdit={handleEditNote} onAddNote={handleAddNote} />
        ) : (
          <ListView onEdit={handleEditNote} onAddNote={handleAddNote} />
        )}
      </main>

      {/* Note Form Modal */}
      <NoteForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        noteToEdit={noteToEdit}
      />

      {/* Toast Notifications */}
      <Toast
        isVisible={toast.isVisible}
        onClose={hideToast}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
