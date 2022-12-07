import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export type Address = {
  name: string;
  x: number;
  y: number;
};

type Props = {
  value: Address | null;
  setValue(newValue: Address | null): void;
  inputValue: string;
  setInputValue(newValue: string): void;
  options: Address[];
};

const TextFieldWithOptions2 = ({
  value,
  setValue,
  inputValue,
  setInputValue,
  options,
}: Props) => {
  return (
    <div>
      <div>{`value: ${value !== null ? `'${value.name}'` : "null"}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: Address | null) => {
          setValue(newValue);
        }}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        renderInput={(params) => <TextField {...params} label="Adresse" />}
      />
    </div>
  );
};
export default TextFieldWithOptions2;
