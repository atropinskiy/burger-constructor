import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  isLoading: boolean;  // Добавляем флаг загрузки
}

const initialState: ModalState = {
  isOpen: false,
  title: undefined,
  content: undefined,
  isLoading: false,  // Изначально не загружается
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ title?: string, content?: React.ReactNode }>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.isLoading = true; // Начинаем загрузку
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = undefined;
      state.content = undefined;
      state.isLoading = false; // Закрываем модалку, загрузка завершена
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { openModal, closeModal, setLoading } = modalSlice.actions;
export default modalSlice.reducer;
