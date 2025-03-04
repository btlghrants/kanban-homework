import React, {useContext, useEffect} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import Close from '@mui/icons-material/Close';
import Done from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { BoardContext } from "@/components/BoardContext";
import Select from '@/components/rhfmui/Select';
import { Task } from '@/app/api/db';

export const zodSchema = z.object({
  id: z.string()
    .uuid(),
  owner: z.string()
    .min(1)
    .max(50),
  title: z.string()
    .min(1)
    .max(50),
  content: z.string()
    .min(1)
    .max(500),
  stageId: z.string()
    .uuid(),
  order: z.number()
    .min(0),
});
export type Schema = z.infer<typeof zodSchema>;
export const defaultValues : Schema = {
  id: "",
  owner: "",
  title: "",
  content: "",
  stageId: "",
  order: 0,
}
type InputSchema = Schema & {
  stage: ""
}

interface CardCreateProps {
  open: boolean;
  close: () => void;
}

export default function CardCreate({
  open,
  close,
}: Readonly<CardCreateProps>) {
  const { boardState, setBoardState } = useContext(BoardContext);
  const { tasks, stages, cardCreateStageId } = boardState;

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
    setValue,
  } = formMethods;

  useEffect(() => {
    reset();
    if (open === true) { setValue("id", uuidv4()) };
  }, [open, reset, setValue]);

  const stage = stages.find(stage => stage.id === cardCreateStageId);
  if (!stage) { return ; }
  const { title, description } = stage;

  const onSubmit = (formInputs: Schema) => {
    const newTask = formInputs as Task;
    let newTasks = [...tasks];
    newTasks.splice(newTask.order, 0, newTask as Task);
    newTasks = newTasks.sort((a, b) => a.order - b.order);
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
            <h1 className={`text-3xl pb-1`}>{title}</h1>
            <h2 className={`text-xl pb-5`}>{description}</h2>
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
              <Select<InputSchema>
                name="stageId"
                label="Stage"
                items={ stages.map(stage => ({value: stage.id, text: stage.title}) ) }
                defaultValue={stage.id}
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
