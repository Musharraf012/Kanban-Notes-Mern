import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useKanbanData, useReduxNotes } from "../hooks/useReduxNotes";
import { NOTE_STATUS } from "../slices/notesSlice";
import NoteCard from "./NoteCard";
import Card from "./ui/Card";
import Button from "./ui/Button";

// Sortable note card
const SortableNoteCard = ({ note, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <NoteCard
        note={note}
        isDragging={isDragging}
        onEdit={onEdit}
        dragListeners={listeners}
      />
    </div>
  );
};

// Column component
const KanbanColumn = ({ status, notes, onEdit, onAddNote }) => {
  const { setNodeRef: setDroppableRef } = useDroppable({ id: status });

  const getStatusColor = (status) => {
    switch (status) {
      case NOTE_STATUS.TODO:
        return "border-blue-200 bg-blue-50";
      case NOTE_STATUS.IN_PROGRESS:
        return "border-orange-200 bg-orange-50";
      case NOTE_STATUS.DONE:
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case NOTE_STATUS.TODO:
        return <span>📝</span>;
      case NOTE_STATUS.IN_PROGRESS:
        return <span>⏳</span>;
      case NOTE_STATUS.DONE:
        return <span>✅</span>;
      default:
        return null;
    }
  };

  return (
    <div ref={setDroppableRef} className="flex-1 min-w-0">
      <Card className={`${getStatusColor(status)} border-2`} padding="sm">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getStatusIcon(status)}
            <h3 className="font-semibold text-gray-900">{status}</h3>
            <span className="bg-white text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
              {notes.length}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onAddNote(status)}>
            ➕
          </Button>
        </div>

        {/* Notes List */}
        <SortableContext
          items={notes.map((note) => note.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 min-h-[200px]">
            {notes.map((note) => (
              <SortableNoteCard key={note.id} note={note} onEdit={onEdit} />
            ))}

            {/* Empty State */}
            {notes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <p className="text-sm">No notes in {status}</p>
              </div>
            )}
          </div>
        </SortableContext>
      </Card>
    </div>
  );
};

// Kanban board
const KanbanBoard = ({ onEdit, onAddNote }) => {
  const { moveNote } = useReduxNotes();
  const { kanbanData } = useKanbanData();
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    console.log("Drag ended!", active.id, over?.id);

    if (!over) return;

    const allNotes = kanbanData.flatMap((col) => col.notes);
    const draggedNote = allNotes.find((note) => note.id === active.id);
    if (!draggedNote) return;

    let targetStatus = draggedNote.status;

    // Dropped on column (overId is status) or note
    if (Object.values(NOTE_STATUS).includes(over.id)) {
      targetStatus = over.id;
    } else {
      const targetNote = allNotes.find((note) => note.id === over.id);
      if (targetNote) targetStatus = targetNote.status;
    }

    if (targetStatus !== draggedNote.status) {
      console.log("Moving note", active.id, "to", targetStatus);
      moveNote(active.id, targetStatus);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const allNotes = kanbanData.flatMap((col) => col.notes);
  const activeNote = activeId
    ? allNotes.find((note) => note.id === activeId)
    : null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
        {kanbanData.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            notes={column.notes}
            onEdit={onEdit}
            onAddNote={onAddNote}
          />
        ))}
      </div>

      <DragOverlay>
        {activeNote && (
          <NoteCard note={activeNote} isDragging={true} onEdit={onEdit} />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
