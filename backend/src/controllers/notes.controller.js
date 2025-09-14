import { Note } from "../models/notes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNote = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !description) {
        return new ApiError(400, null, "All fields are required");
    }

    const note = await Note.create(
        {
            title,
            description,
            status
        }
    )

    return res.status(201).json(new ApiResponse(200, note, "Note created successfully"));

});

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(201).json(new ApiResponse(200, notes, "Notes fetched successfully"));

});
const getNoteById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate id
    if (!id) {
        throw new ApiError(400, "Note ID is required");
    }

    const note = await Note.findById(id);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note fetched successfully"));
});

const updateNoteById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!id) {
        throw new ApiError(400, "Note ID is required");
    }

    const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, description, status }, // only update provided fields
        { new: true, runValidators: true } // return updated doc + enforce schema validators
    );

    if (!updatedNote) {
        throw new ApiError(404, "Note not found");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

const deleteNoteById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Note ID is required");
    }
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
        throw new ApiError(404, "Note not found");
    }
    return res
        .status(201)
        .json(new ApiResponse(200, deletedNote, "Note deleted successfully"));
});

export { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById };