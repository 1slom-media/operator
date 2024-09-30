import { Box, FormHelperText, styled } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const CustomQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Container = styled(Box)(({ theme, box_height }) => ({
  "& .quill": {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.quill,
    border: `1px solid ${theme.palette.background.card}`,
    borderRadius: "15px",
  },
  "& .ql-toolbar.ql-snow": {
    padding: 0,
    margin: "0 10px 10px 10px",
    border: "none",
    paddingTop: "10px",
    order: 1,
    borderTop: `1px solid ${theme.palette.background.card}`,
  },
  "& .ql-editor": {
    minHeight: box_height ?? 500,
    direction: theme.direction, // ...(theme.direction === "rtl" && { direction: "rtl", textAlign: "right" }),
  },
  "& .ql-container.ql-snow": {
    border: "none",
  },
  "& .ql-container": {
    minHeight: box_height ?? 500,
    // borderColor: theme.palette.divider,
  },
}));

const ReactQuill = ({
  error,
  box_height,
  input: { onChange, value },
  meta,
  ...props
}) => {
  return (
    <Container box_height={box_height}>
      <CustomQuill
        theme="snow"
        modules={modules}
        {...props}
        onChange={onChange}
        value={value}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Container>
  );
};

ReactQuill.defaultProps = {
  input: { onChange: () => {}, value: "" },
};

const modules = {
  toolbar: [
    [
      {
        header: [1, 2, 3, 4, 5, 6, false],
      },
    ],
    [
      {
        font: [],
      },
    ],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      {
        list: "ordered",
      },
      {
        list: "bullet",
      },
      {
        indent: "-1",
      },
      {
        indent: "+1",
      },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export default ReactQuill;
