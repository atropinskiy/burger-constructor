import reducer, { openModal, closeModal, setLoading } from './modal-slices';
import { IngredientModel } from '../../types/auth/types';

const initialState = {
  isOpen: false,
  title: undefined,
  content: undefined,
  ingredient: undefined,
  isLoading: false,
};

describe('modalSlice', () => {
  it('should handle openModal with full payload', () => {
    const ingredient: IngredientModel = {
      _id: '123',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 15,
      calories: 200,
      price: 50,
      image: 'image-url',
      image_mobile: 'image-mobile-url',
      image_large: 'image-large-url',
    };

    const action = openModal({
      title: 'Modal Title',
      content: 'Some content',
      ingredient,
    });

    const state = reducer(initialState, action);

    expect(state.isOpen).toBe(true);
    expect(state.title).toBe('Modal Title');
    expect(state.content).toBe('Some content');
    expect(state.ingredient).toEqual(ingredient);
    expect(state.isLoading).toBe(true);
  });

  it('should handle openModal with partial payload', () => {
    const action = openModal({});
    const state = reducer(initialState, action);

    expect(state.isOpen).toBe(true);
    expect(state.title).toBeUndefined();
    expect(state.content).toBeUndefined();
    expect(state.ingredient).toBeUndefined();
    expect(state.isLoading).toBe(true);
  });

  it('should handle closeModal', () => {
    const modifiedState = {
      isOpen: true,
      title: 'Title',
      content: 'Content',
      ingredient: {
        _id: '1',
        name: 'Ingredient',
        type: 'main',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 10,
        image: '',
        image_mobile: '',
        image_large: '',
      },
      isLoading: true,
    };

    const state = reducer(modifiedState, closeModal());

    expect(state).toEqual(initialState);
  });

  it('should handle setLoading', () => {
    const state = reducer(initialState, setLoading(true));
    expect(state.isLoading).toBe(true);

    const newState = reducer(state, setLoading(false));
    expect(newState.isLoading).toBe(false);
  });
});
