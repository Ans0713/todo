import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  input: '',
  isEditing: false,
  editingIndex: -1,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    addTask: (state) => {
      state.list.push({ text: state.input, completed: false });
      state.input = '';
    },
    updateTask: (state) => {
      if (state.editingIndex > -1) {
        state.list[state.editingIndex].text = state.input;
        state.isEditing = false;
        state.editingIndex = -1;
        state.input = '';
      }
    },
    deleteTask: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    editTask: (state, action) => {
      state.input = state.list[action.payload].text;
      state.isEditing = true;
      state.editingIndex = action.payload;
    },
    toggleComplete: (state, action) => {
      const task = state.list[action.payload];
      task.completed = !task.completed;
    },
    saveToLocalStorage: (state) => {
      localStorage.setItem('todos', JSON.stringify(state.list));
    },
  },
});

export const { setInput, addTask, updateTask, deleteTask, editTask, toggleComplete, saveToLocalStorage } = todosSlice.actions;
export default todosSlice.reducer;
