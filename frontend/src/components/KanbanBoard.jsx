// import React, { useState } from "react";
// import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { useKanbanData, useReduxNotes } from "../hooks/useReduxNotes";
// import { NOTE_STATUS } from "../slices/notesSlice";
// import NoteCard from "./NoteCard";
// import Card from "./ui/Card";
// import Button from "./ui/Button";

// const SortableNoteCard = ({ note, onEdit }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: note.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <NoteCard
//         note={note}
//         isDragging={isDragging}
//         onEdit={onEdit}
//         dragListeners={listeners}
//       />
//     </div>
//   );
// };

// const KanbanColumn = ({ status, notes, onEdit, onAddNote }) => {
//   const columnNotes = notes;

//   const getStatusColor = (status) => {
//     switch (status) {
//       case NOTE_STATUS.TODO:
//         return "border-blue-200 bg-blue-50";
//       case NOTE_STATUS.IN_PROGRESS:
//         return "border-orange-200 bg-orange-50";
//       case NOTE_STATUS.DONE:
//         return "border-green-200 bg-green-50";
//       default:
//         return "border-gray-200 bg-gray-50";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case NOTE_STATUS.TODO:
//         return (
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//             />
//           </svg>
//         );
//       case NOTE_STATUS.IN_PROGRESS:
//         return (
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//         );
//       case NOTE_STATUS.DONE:
//         return (
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex-1 min-w-0">
//       <Card className={`${getStatusColor(status)} border-2`} padding="sm">
//         {/* Column Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             {getStatusIcon(status)}
//             <h3 className="font-semibold text-gray-900">{status}</h3>
//             <span className="bg-white text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
//               {columnNotes.length}
//             </span>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => onAddNote(status)}
//             className="p-1 h-6 w-6"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//               />
//             </svg>
//           </Button>
//         </div>

//         {/* Notes List */}
//         <SortableContext
//           items={columnNotes.map((note) => note.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <div className="space-y-3 min-h-[200px]">
//             {columnNotes.map((note) => (
//               <SortableNoteCard key={note.id} note={note} onEdit={onEdit} />
//             ))}

//             {/* Empty State */}
//             {columnNotes.length === 0 && (
//               <div className="flex flex-col items-center justify-center py-8 text-gray-500">
//                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
//                   {getStatusIcon(status)}
//                 </div>
//                 <p className="text-sm">No notes in {status}</p>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => onAddNote(status)}
//                   className="mt-2 p-2"
//                   title="Add new note"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     />
//                   </svg>
//                 </Button>
//               </div>
//             )}
//           </div>
//         </SortableContext>
//       </Card>
//     </div>
//   );
// };

// const KanbanBoard = ({ onEdit, onAddNote }) => {
//   const { moveNote } = useReduxNotes();
//   const { kanbanData } = useKanbanData();
//   const [activeId, setActiveId] = useState(null);

//   const handleDragStart = (event) => {
//     setActiveId(event.active.id);
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     setActiveId(null);
//     console.log("hii");

//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;

//     // Find the note being dragged
//     const allNotes = kanbanData.flatMap((column) => column.notes);
//     const draggedNote = allNotes.find((note) => note.id === activeId);

//     if (!draggedNote) return;

//     // Determine the target status based on the drop zone
//     let targetStatus = draggedNote.status;

//     // If dropped on a column (overId is a status)
//     if (Object.values(NOTE_STATUS).includes(overId)) {
//       targetStatus = overId;
//     } else {
//       // If dropped on another note, find that note's status
//       const targetNote = allNotes.find((note) => note.id === overId);
//       if (targetNote) {
//         targetStatus = targetNote.status;
//       }
//     }

//     // Only move if status changed
//     if (targetStatus !== draggedNote.status) {
//       console.log("Moving note", activeId, "to", targetStatus);
//       moveNote(activeId, targetStatus);
//     }
//   };

//   const handleDragCancel = () => {
//     setActiveId(null);
//   };

//   // Get the active note for drag overlay
//   const allNotes = kanbanData.flatMap((column) => column.notes);
//   const activeNote = activeId
//     ? allNotes.find((note) => note.id === activeId)
//     : null;

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd}
//       onDragCancel={handleDragCancel}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
//         {kanbanData.map((column) => (
//           <KanbanColumn
//             key={column.status}
//             status={column.status}
//             notes={column.notes}
//             onEdit={onEdit}
//             onAddNote={onAddNote}
//           />
//         ))}
//       </div>

//       <DragOverlay>
//         {activeNote ? (
//           <div className="transform rotate-2">
//             <NoteCard
//               note={activeNote}
//               isDragging={true}
//               onEdit={onEdit}
//               dragListeners={undefined}
//             />
//           </div>
//         ) : null}
//       </DragOverlay>
//     </DndContext>
//   );
// };

// export default KanbanBoard;

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
