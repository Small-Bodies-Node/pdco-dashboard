import React, { useState } from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import ErrorIcon from '@material-ui/icons/Error';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface IProps {
  message?: string;
}

const defaultMessage = 'Error Occurred - Contact Site Admin!';

export const MyError: React.FC<IProps> = ({ message }: IProps) => {
  // ----------------------------------------------------------->>>

  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <ErrorIcon scale={5} style={{ fontSize: 60 }} />
      <Snackbar open={isOpen} autoHideDuration={null} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message || defaultMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
