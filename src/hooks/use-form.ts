import { useState, ChangeEvent } from 'react';

interface FormValues {
	[key: string]: string;
}

export function useForm<T extends FormValues>(inputValues: T = {} as T) {
	const [values, setValues] = useState<T>(inputValues);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues((prevValues) => ({ ...prevValues, [name]: value }));
	};

	return { values, handleChange, setValues };
}
