import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { Address } from "../api/ignGeoportail";

type Props = {
  value: Address | null;
  setValue(newValue: Address | null): void;
  inputValue: string;
  setInputValue(newValue: string): void;
  options: Address[];
  isLoading: boolean;
};

export const TextFieldWithOptions = ({
  value,
  setValue,
  inputValue,
  setInputValue,
  options,
  isLoading,
}: Props) => {
  return (
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
      filterOptions={(options, inputValue) => options}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Adresse"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <SearchIcon />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
