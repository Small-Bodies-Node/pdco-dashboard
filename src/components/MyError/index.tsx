import React, { useState } from "react";

type IProps = any;

export const MyError: React.FC<IProps> = ({ message }: IProps) => {
  // --->>

  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);

  return <>MyError</>;
};
