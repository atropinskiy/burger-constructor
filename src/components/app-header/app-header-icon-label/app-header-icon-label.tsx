import React from 'react';
import s from './app-header-icon-label.module.scss';

interface AppHeaderIconLabelProps {
	label: string;
	className?: string;
	icon?: React.ReactNode;
}

export const AppHeaderIconLabel = ({
	label,
	className,
	icon,
}: AppHeaderIconLabelProps) => {
	return (
		<div className={`${s.bg} text text_type_main-default" ${className}`}>
			{icon && <span className='mr-2'>{icon}</span>}{' '}
			<p className='text text_type_main-default'>{label}</p>
		</div>
	);
};
