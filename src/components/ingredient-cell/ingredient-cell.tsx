import React from 'react';
import s from './ingredient-cell.module.scss';

interface ingredientCellProps {
  title: string;
  type: 'bun' | 'content'
}

const IngredientCell: React.FC<ingredientCellProps> = ({ title, type }) => {
  const cellClass = type === 'bun' ? s.top_bun : s.cell;
  return (
    <div className={cellClass}>
      <h2>{title}</h2>
    </div>
  );
};

export default IngredientCell;
