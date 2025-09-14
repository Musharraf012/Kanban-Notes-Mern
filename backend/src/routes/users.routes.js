import { Router } from "express";
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from "../controllers/notes.controller.js";
import { loginUser, logoutUser, registerUser } from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";


const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// protected routes
router.route('/logout').post(verifyJWT, logoutUser);



export default router;