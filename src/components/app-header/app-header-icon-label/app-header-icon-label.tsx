import React from 'react';
import s from './app-header-icon-label.module.scss';

interface AppHeaderIconLabelProps {
	label: string;
	className?: string;
	icon?: React.ReactNode;
	disabled?: boolean;
}

export const AppHeaderIconLabel = ({
	label,
	className,
	icon,
	disabled = false,
}: AppHeaderIconLabelProps) => {
	return (
		<div
			className={`${s.bg} text text_type_main-default ${className} ${
				disabled ? s.disabled : ''
			}`}>
			{icon && <span className='mr-2'>{icon}</span>}
			<p
				className={`text text_type_main-default ${
					disabled ? 'text_color_inactive' : 'color-white'
				}`}>
				{label}
			</p>
		</div>
	);
};
