import React, {useContext} from 'react';
import { BoardContext } from "@/components/BoardContext";
import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface CardCreateProps {
  open: boolean;
  close: () => void;
}

export default function CardCreate({
  open,
  close,
}: Readonly<CardCreateProps>) {
  const { boardState } = useContext(BoardContext);
  const { stages, cardCreateStageId } = boardState;

  const stage = stages.find(stage => stage.id === cardCreateStageId);
  if (!stage) { return ; }

  const { title, description } = stage;
  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              close();
            },
            className: `bg-blue-300`
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <IconButton
            className={`bg-red-400 rounded-lg shadow-sm`}
            onClick={close}
          >
            <Close />
          </IconButton>
          <IconButton
            className={`bg-blue-400 rounded-lg shadow-sm`}
            type="submit"
          >
            <Done />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
