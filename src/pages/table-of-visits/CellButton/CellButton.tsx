import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import clsx from 'clsx';

import s from './CellButton.module.scss';

type CellButtonProps= {
  onClick: (isRate: boolean) => Promise<void>,
  children: React.ReactNode,
}

const CellButton: React.FC<CellButtonProps> = ({ children, onClick }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    const input = event.target as HTMLElement;
    setIsFetching(true);
    await onClick(!input.innerText);
    setIsFetching(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(s.button, {
        fetching: isFetching,
      })}
      disabled={isFetching}
    >
      {
        isFetching && (
          <div className={s.progressWrapper}>
            <CircularProgress />
          </div>
        )
      }
      {children}
    </button>
  );
};

export default CellButton;
