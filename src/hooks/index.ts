// src/hooks/index.ts
import {
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
} from 'react-redux';
import { AppDispatch, RootState } from '../services/store';

// Типизированный хук useDispatch
export const useDispatch = () => useReduxDispatch<AppDispatch>();

// Типизированный хук useSelector
export const useSelector = <TSelected = unknown>(
	selector: (state: RootState) => TSelected
) => useReduxSelector(selector);
