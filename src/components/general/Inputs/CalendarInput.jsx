import * as React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InputAdornment } from "@mui/material";
import PropTypes from "prop-types";
import uz from "date-fns/locale/uz";

const CalendarInput = ({ label, input, classes, meta, ...custom }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uz}>
      <MobileDatePicker
        error={meta.touched ? meta.invalid : null}
        fullWidth
        helperText={meta.touched ? meta.error : null}
        label={label}
        placeholder={label}
        {...input}
        {...custom}
        inputFormat="dd-MMMM, yyy, HH:mm"
        cancelLabel="Bekor qilish"
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            size="small"
            label={label}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CalendarInput;

CalendarInput.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

CalendarInput.defaultProps = {
  props: {
    label: "",
    placeholder: "",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};
