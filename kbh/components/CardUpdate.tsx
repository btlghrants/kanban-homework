import React, {useContext, useEffect} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { BoardContext } from "@/components/BoardContext";
import { Task } from '@/app/api/db';
import { zodSchema, Schema, defaultValues } from '@/components/CardCreate';
import { updateTask } from '@/app/serverActions';

interface CardUpdateProps {
  open: boolean;
  close: () => void;
}

export default function CardUpdate({
  open,
  close,
}: Readonly<CardUpdateProps>) {
  const { boardState, setBoardState } = useContext(BoardContext);
  const { tasks, cardUpdateTaskId } = boardState;

  const formMethods = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(zodSchema),
    defaultValues,
  });
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = formMethods;

  const task = tasks.find(task => task.id === cardUpdateTaskId);
  useEffect(() => { reset(task || defaultValues); }, [reset, task]);

  const onSubmit = async (formInputs: Schema) => {
    const newTask = formInputs as Task;
    const newTasks = [...tasks];
    const taskIdx = newTasks.findIndex(task => task.id === newTask.id);
    newTasks[taskIdx] = newTask;

    await updateTask(newTask);

    setBoardState(prev => ({...prev, tasks: newTasks}));
    close();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      slotProps={{
        paper: {
          className: `bg-blue-300 w-110`,
        },
      }}
    >
      <DialogContent>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={`text-3xl pb-5`}>Edit Task</h1>
            <div className={`flex flex-col gap-y-3`}>
              <TextField {...register('id')} label="Id" disabled />
              <TextField {...register('title')}
                label="Title"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <TextField {...register('content')}
                label="Content"
                error={!!errors.content}
                helperText={errors.content?.message}
              />
              <TextField {...register('owner')}
                label="Owner"
                error={!!errors.owner}
                helperText={errors.owner?.message}
              />
            </div>
          <div className={`flex flex-row justify-between w-full pt-5`}>
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
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
