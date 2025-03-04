import React from 'react';
import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface ConfirmProps {
  isOpen: boolean;
  prompt: string;
  explain: string[];
  confirm: () => void;
  cancel: () => void;
}

export default function Confirm({
  isOpen,
  prompt,
  explain,
  confirm,
  cancel,
}: Readonly<ConfirmProps>) {
  return (
    <Dialog
      open={isOpen}
      onClose={cancel}
      slotProps={{
        paper: {
          className: `bg-blue-400 w-128`,
        },
      }}
    >
      <DialogContent>
        <h1 className={`text-3xl pb-2`}>{prompt}</h1>
        <h2 className={`text-xl pb-3`}>
          {explain.map((line, idx) => {
            return line ? <div key={idx}>{line}</div> : <br/>
          })}
        </h2>

        <div className={`flex flex-row justify-between w-full pt-5`}>
          <IconButton
            className={`bg-red-400 icon-button size-10`}
            onClick={cancel}
          >
            <Close />
          </IconButton>
          <IconButton
            className={`bg-green-400 icon-button`}
            onClick={confirm}
          >
            <Done />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
