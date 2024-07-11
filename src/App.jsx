import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInput, addTask, updateTask, deleteTask, editTask, toggleComplete, saveToLocalStorage } from './redux/todoslice';
import './App.css';

const App = () => {
  const { list, input, isEditing } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveToLocalStorage());
  }, [list, dispatch]);

  const handleInput = (e) => {
    dispatch(setInput(e.target.value));
  };

  const handleTask = () => {
    if (isEditing) {
      dispatch(updateTask());
    } else {
      dispatch(addTask());
    }
    dispatch(saveToLocalStorage());
  };

  const handleDelete = (index) => {
    dispatch(deleteTask(index));
    dispatch(saveToLocalStorage());
  };

  const handleEdit = (index) => {
    dispatch(editTask(index));
  };

  const handleToggleComplete = (index) => {
    dispatch(toggleComplete(index));
  };

  return (
    <div className="app">
      <h2>Todo App</h2>
      <div className="container">
        <div className="input-box">
          <input type="text" value={input} onChange={handleInput} placeholder="Enter Task" />
          <button onClick={handleTask}>{isEditing ? 'Update Task' : 'Add Task'}</button>
        </div>
        <div className="list">
          <ul>
            {list.map((item, i) => (
              <li key={i}>
                <div className={`task-text ${item.completed ? 'completed' : ''}`}>
                  <input type="checkbox" checked={item.completed} onChange={() => handleToggleComplete(i)} />
                  <span>{item.text}</span>
                </div>
                <div>
                  <button onClick={() => handleEdit(i)}>Edit</button>
                  <button onClick={() => handleDelete(i)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
