import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";

type Props<T> = {
  value: T | null;
  setValue(newValue: T | null): void;
  inputValue: string;
  setInputValue(newValue: string): void;
  options: T[];
  isLoading: boolean;
  getOptionLabel(value: T): string;
};

const TextFieldWithOptions = <T extends { nom: string; code: string }>({
  value,
  setValue,
  inputValue,
  setInputValue,
  options,
  isLoading,
  getOptionLabel,
}: Props<T>) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: T | null) => {
        setValue(newValue);
      }}
      getOptionLabel={getOptionLabel}
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

export default TextFieldWithOptions;
