import {PayloadAction, combineReducers, createSlice} from '@reduxjs/toolkit';
import {Todo} from '../index';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    checkTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        console.log(todo, '!!');
      }
    },
    loadTodo: (state, action: PayloadAction<Todo[]>) => {
      state.push(...action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const checkedTodo = state.find(item => item.id === action.payload);
      if (checkedTodo) {
        const toDelete = state.indexOf(checkedTodo);
        state.splice(toDelete, 1);
      }
    },
  },
});

export const {addTodo, checkTodo, loadTodo, deleteTodo} = todoSlice.actions;

export const rootReducer = combineReducers({
  todos: todoSlice.reducer,
});
