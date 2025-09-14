import { Router } from "express";
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from "../controllers/notes.controller.js";


const router = Router();
router.route('/').post(createNote)
router.route('/').get(getAllNotes)
router.route('/:id').get(getNoteById)
router.route('/:id').patch(updateNoteById)
router.route('/:id').delete(deleteNoteById)


export default router;