import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './slices/todoSlice';

// Todo type
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
