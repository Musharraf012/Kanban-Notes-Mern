import { handleApiError } from "../utils/handleApiError";
import api from "./axiosInstance";

// Get all notes
export const getNotes = async () => {
    try {
        const { data } = await api.get("/note");
        return data?.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Get note by ID
export const getNoteById = async (id) => {
    try {
        const { data } = await api.get(`/note/${id}`);
        return data;
    } catch (error) {
        handleApiError(error);
    }
};

// Create note
export const createNote = async (noteData) => {
    try {
        const { data } = await api.post("/note", noteData);
        return data;
    } catch (error) {
        handleApiError(error);
    }
};

// Update note
export const updateNote = async (id, updates) => {
    try {
        const { data } = await api.patch(`/note/${id}`, updates);
        return data;
    } catch (error) {
        handleApiError(error);
    }
};

// Delete note
export const deleteNote = async (id) => {
    try {
        const { data } = await api.delete(`/note/${id}`);
        return data;
    } catch (error) {
        handleApiError(error);
    }
};