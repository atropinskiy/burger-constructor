import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import Data from '../../utils/data';

const BurgerConstructor = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
			<ConstructorElement
				type='top'
				isLocked={true}
				text='Краторная булка N-200i (верх)'
				price={200}
				thumbnail={Data[0].image_mobile}
				extraClass='ml-8'
			/>
			<div className='d-flex  valign-center'>
				<DragIcon type='primary' className='mr-2' />
				<ConstructorElement
					text='Краторная булка N-200i (верх)'
					price={50}
					thumbnail={Data[1].image_mobile}
				/>
			</div>
			<div className='d-flex  valign-center'>
				<DragIcon type='primary' className='mr-2' />
				<ConstructorElement
					text='Краторная булка N-200i (верх)'
					price={50}
					thumbnail={Data[2].image_mobile}
				/>
			</div>
			<div className='d-flex  valign-center'>
				<DragIcon type='primary' className='mr-2' />
				<ConstructorElement
					text='Краторная булка N-200i (верх)'
					price={50}
					thumbnail={Data[3].image_mobile}
				/>
			</div>
			<div className='d-flex  valign-center'>
				<DragIcon type='primary' className='mr-2' />
				<ConstructorElement
					text='Краторная булка N-200i (верх)'
					price={50}
					thumbnail={Data[4].image_mobile}
				/>
			</div>
			<div className='d-flex  valign-center'>
				<DragIcon type='primary' className='mr-2' />
				<ConstructorElement
					text='Краторная булка N-200i (верх)'
					price={50}
					thumbnail={Data[5].image_mobile}
				/>
			</div>
			<ConstructorElement
				type='bottom'
				isLocked={true}
				text='Краторная булка N-200i (низ)'
				price={200}
				thumbnail={Data[0].image_mobile}
				extraClass='ml-8'
			/>
		</div>
	);
};

export default BurgerConstructor;
