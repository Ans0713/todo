import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'k2FfAcD82b3eBzgTdH5GbC0PFdUcwOu0'; 

const initialState = {
  list: [],
  input: '',
  isEditing: false,
  editIndex: null,
};

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

const loadFromLocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    try {
      return decryptData(savedTodos);
    } catch (e) {
      console.error('Error decrypting data from local storage', e);
      return initialState;
    }
  }
  return initialState;
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: loadFromLocalStorage(),
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    addTask: (state) => {
      state.list.push({ text: state.input, completed: false });
      state.input = '';
    },
    updateTask: (state) => {
      if (state.editIndex !== null) {
        state.list[state.editIndex].text = state.input;
        state.input = '';
        state.isEditing = false;
        state.editIndex = null;
      }
    },
    deleteTask: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    editTask: (state, action) => {
      state.input = state.list[action.payload].text;
      state.isEditing = true;
      state.editIndex = action.payload;
    },
    toggleComplete: (state, action) => {
      const task = state.list[action.payload];
      task.completed = !task.completed;
    },
    saveToLocalStorage: (state) => {
      const encryptedTodos = encryptData(state);
      localStorage.setItem('todos', encryptedTodos);
    },
  },
});

export const { setInput, addTask, updateTask, deleteTask, editTask, toggleComplete, saveToLocalStorage } = todosSlice.actions;
export default todosSlice.reducer;
