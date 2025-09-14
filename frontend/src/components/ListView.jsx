import React, { useState } from "react";
import { useReduxNotes } from "../hooks/useReduxNotes";
import { NOTE_STATUS } from "../slices/notesSlice";
import NoteCard from "./NoteCard";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";

const ListView = ({ onEdit, onAddNote }) => {
  const { notes, getNotesByStatus } = useReduxNotes();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter notes based on search term and status
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || note.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group notes by status for better organization
  const groupedNotes = {
    [NOTE_STATUS.TODO]: getNotesByStatus(NOTE_STATUS.TODO).filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [NOTE_STATUS.IN_PROGRESS]: getNotesByStatus(NOTE_STATUS.IN_PROGRESS).filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [NOTE_STATUS.DONE]: getNotesByStatus(NOTE_STATUS.DONE).filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case NOTE_STATUS.TODO:
        return "border-l-blue-500";
      case NOTE_STATUS.IN_PROGRESS:
        return "border-l-orange-500";
      case NOTE_STATUS.DONE:
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case NOTE_STATUS.TODO:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        );
      case NOTE_STATUS.IN_PROGRESS:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case NOTE_STATUS.DONE:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <Card padding="lg">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value={NOTE_STATUS.TODO}>To Do</option>
              <option value={NOTE_STATUS.IN_PROGRESS}>In Progress</option>
              <option value={NOTE_STATUS.DONE}>Done</option>
            </select>

            {/* <button
              onClick={() => onAddNote()}
              className="p-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center"
              title="Add new note"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button> */}
          </div>
        </div>
      </Card>

      {/* Notes List */}
      {statusFilter === "all" ? (
        // Show grouped notes by status
        <div className="space-y-6">
          {Object.entries(groupedNotes).map(
            ([status, statusNotes]) =>
              statusNotes.length > 0 && (
                <div key={status}>
                  <div className="flex items-center space-x-2 mb-4">
                    {getStatusIcon(status)}
                    <h2 className="text-lg font-semibold text-gray-900">
                      {status}
                    </h2>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                      {statusNotes.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statusNotes.map((note) => (
                      <div
                        key={note.id}
                        className={`border-l-4 ${getStatusColor(note.status)}`}
                      >
                        <NoteCard
                          note={note}
                          onEdit={onEdit}
                          dragListeners={undefined}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        // Show filtered notes in a single grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`border-l-4 ${getStatusColor(note.status)}`}
            >
              <NoteCard note={note} onEdit={onEdit} dragListeners={undefined} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <Card padding="xl" className="text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notes found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first note"}
            </p>
            <button
              onClick={() => onAddNote()}
              className="p-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center"
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
        </Card>
      )}
    </div>
  );
};

export default ListView;
