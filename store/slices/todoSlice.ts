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
      }
    },
    loadTodo: (state, action: PayloadAction<Todo[]>) => {
      state.push(...action.payload);
    },
  },
});

export const {addTodo, checkTodo, loadTodo} = todoSlice.actions;

export const rootReducer = combineReducers({
  todos: todoSlice.reducer,
});
