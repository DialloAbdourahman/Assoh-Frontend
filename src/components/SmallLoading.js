import React from 'react';
import { CircularProgress } from '@mui/material';

const SmallLoading = () => {
  return (
    <div className='flex-center' style={{ zIndex: 5000 }}>
      <CircularProgress />
    </div>
  );
};

export default SmallLoading;
