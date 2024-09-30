import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { TextField } from "@mui/material";

export default function StyledTextArea({
  label,
  input,
  classes,
  meta,
  ...custom
}) {
  const addEmoji = (emoji) => () => input.onChange(`${input.value}${emoji}`);
  return (
      <TextField
        error={meta.touched ? meta.invalid : null}
        fullWidth
        helperText={meta.touched ? meta.error : null}
        placeholder={label}
        {...input}
        {...custom}
        minRows={4}
        variant="outlined"
        sx={{ padding: "5px", width: "200px", }}
        endDecorator={
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("👍")}
            >
              👍
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("😔")}
            >
              😔
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("😡")}
            >
              😡
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("🛠")}
            >
              🛠
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("🏦")}
            >
              🏦
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("✈️")}
            >
              ✈️
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={() => input.onChange("")}
            >
              <SettingsBackupRestoreIcon />
            </IconButton>
          </Box>
        }
      />
  );
}

StyledTextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object,
};

StyledTextArea.defaultProps = {
  label: "Xabar kiriting",
  placeholder: "",
  classes: {},
  meta: {},
  input: {},
  custom: {},
};
