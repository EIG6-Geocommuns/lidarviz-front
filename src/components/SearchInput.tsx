import { useState, useMemo, type ReactNode, type HTMLAttributes } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { SearchBar, type SearchBarProps } from "@codegouvfr/react-dsfr/SearchBar";
import { createUseDebounce } from "powerhooks/useDebounce";
import { same } from "evt/tools/inDepth/same";
import { useRerenderOnChange } from "powerhooks/tools/StatefulObservable/hooks/useRerenderOnChange";

export type SearchInputProps<T extends string | Record<string, unknown>> = {
  className?: string;
  value: T | undefined;
  onValueChange: (value: T | undefined) => void;
  debounceDelay: number;
  getOptions: (inputText: string) => Promise<T[]>;
  getOptionLabel: (value: T) => string;
  renderOption?: (liProps: HTMLAttributes<HTMLLIElement>, option: T) => ReactNode;
  noOptionText: ReactNode;
  loadingText: ReactNode;
  dsfrSearchBarProps?: SearchBarProps;
};

export const SearchInput = <T extends string | Record<string, unknown>>(
  props: SearchInputProps<T>
) => {
  const {
    className,
    value,
    onValueChange,
    debounceDelay,
    getOptions,
    getOptionLabel,
    renderOption,
    noOptionText,
    loadingText,
    dsfrSearchBarProps,
  } = props;

  const { useDebounce, obsIsDebouncing } = useMemo(
    () => createUseDebounce({ delay: debounceDelay }),
    [debounceDelay]
  );
  const [options, setOptions] = useState<readonly T[]>([]);
  const [inputValue, setInputValue] = useState("");

  const { isOpen, onClose, onOpen } = (function useClosure() {
    const [isOpenAccordingToMui, setIsOpenAccordingToMui] = useState(false);

    return {
      isOpen: isOpenAccordingToMui && inputValue !== "",
      onOpen: () => setIsOpenAccordingToMui(true),
      onClose: () => setIsOpenAccordingToMui(false),
    };
  })();

  const { isLoading, setIsGettingOptions } = (function useClosure() {
    useRerenderOnChange(obsIsDebouncing);

    const [isGettingOptions, setIsGettingOptions] = useState(false);

    return {
      isLoading: isGettingOptions || obsIsDebouncing.current,
      setIsGettingOptions,
    };
  })();

  useDebounce(() => {
    if (inputValue === "") {
      setOptions([]);
      return;
    }

    let isActive = true;

    (async () => {
      setOptions([]);
      setIsGettingOptions(true);

      const options = await getOptions(inputValue);

      if (!isActive) {
        return;
      }

      setOptions(options);
      setIsGettingOptions(false);
    })();

    return () => {
      isActive = false;
    };
  }, [inputValue]);

  return (
    <Autocomplete
      className={className}
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onInputChange={(_event, newValue) => setInputValue(newValue)}
      onChange={(_event, newValue) => onValueChange(newValue ?? undefined)}
      value={value ?? null}
      filterOptions={(options: T[]) => options}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      noOptionsText={noOptionText}
      loadingText={loadingText}
      options={options}
      loading={isLoading}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      isOptionEqualToValue={(option: T, value: T) => same(option, value)}
      renderInput={(params) => (
        <SearchBar
          {...dsfrSearchBarProps}
          style={{
            width: params.size,
            ...dsfrSearchBarProps?.style,
          }}
          ref={params.InputProps.ref}
          nativeInputProps={{
            ...params.inputProps,
            ...dsfrSearchBarProps?.nativeInputProps,
          }}
        />
      )}
    />
  );
};
