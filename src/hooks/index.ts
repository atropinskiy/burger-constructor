// src/hooks/index.ts
import {
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
} from 'react-redux';
import { AppDispatch } from '../services/store';
import { RootState } from '@services/root-reucer';

// Типизированный хук useDispatch
export const useDispatch = () => useReduxDispatch<AppDispatch>();

// Типизированный хук useSelector
export const useSelector = <TSelected = unknown>(
	selector: (state: RootState) => TSelected
) => useReduxSelector(selector);
