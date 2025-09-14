import React, { useState, useEffect } from 'react';
import { useReduxNotes } from '../hooks/useReduxNotes';
import { NOTE_STATUS } from '../slices/notesSlice';
import Button from './ui/Button';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Modal from './ui/Modal';

const NoteForm = ({ isOpen, onClose, noteToEdit = null }) => {
  const { addNote, updateNote } = useReduxNotes();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: NOTE_STATUS.TODO
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (noteToEdit) {
      setFormData({
        title: noteToEdit.title,
        description: noteToEdit.description,
        status: noteToEdit.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: NOTE_STATUS.TODO
      });
    }
    setErrors({});
  }, [noteToEdit, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (noteToEdit) {
      updateNote(noteToEdit.id, formData);
    } else {
      addNote(formData);
    }
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={noteToEdit ? 'Edit Note' : 'Add New Note'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title"
          error={errors.title}
          required
        />
        
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter note description"
          error={errors.description}
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value={NOTE_STATUS.TODO}>To Do</option>
            <option value={NOTE_STATUS.IN_PROGRESS}>In Progress</option>
            <option value={NOTE_STATUS.DONE}>Done</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            {noteToEdit ? 'Update Note' : 'Add Note'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NoteForm;
