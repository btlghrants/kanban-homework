// MUI + controller component + Zod + react-hooks-form + TypeScript intellisense
// https://youtu.be/7anLE_RoDwU

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { default as MuiSelect } from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  items: {value: string, text: string}[];
  defaultValue: string;
}

export default function Select<T extends FieldValues>({
  name,
  label,
  items,
  defaultValue,
}: SelectProps<T>) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue("stageId", defaultValue);
  }, [setValue, defaultValue]);

  return (
    <Controller
      control={control}
      name={name}
      render={({field: { value, onChange }}) => (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <MuiSelect

            value={value}
            label={label}
            onChange={onChange}
          >
            { items.map(item => (
              <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      )}
    />
  );
}