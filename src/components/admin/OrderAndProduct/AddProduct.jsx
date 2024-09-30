import {
  Stack,
  TextField,
  styled,
  IconButton,
  Button,
  Modal,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ProductSelectRow from "./ProductSelectRow";
import axios from "axios";
import { useSelector } from "react-redux";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "2px",
  height: "100%",
  paddingInline: "15px",
  background: theme.palette.background.lightGray,
  "&:hover": {
    background: theme.palette.background.lightGray,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", md: 800, lg: 1200 },
  bgcolor: "background.paper",
  border: 0,
  outline: "none",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px",
};

const SelectExtraProduct = ({ input: { value, onChange } }) => {
  const [open, setOpen] = React.useState(false);
  const [searchData, setSearchData] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const handleSearch = async (e) => {
    const res = await axios({
      method: "GET",
      url: `${server}/product/get-with-variants?filter=${e.target.value}`,
    });
    setSearchData(res?.data);
  };

  return (
    <>
      <Button size="small" variant="outlined" onClick={handleOpen}>
        Mahsulot qo&apos;shish
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <TextField
              onChange={handleSearch}
              placeholder="Buyurtma uchun mahsulot qo'shish"
              label="Buyurtma uchun mahsulot qo'shish"
              InputProps={{
                startAdornment: (
                  <StyledIconButton>
                    <Search
                      sx={{
                        fontSize: 25,
                        marginInline: "auto",
                      }}
                    />
                  </StyledIconButton>
                ),
              }}
            />
          </Stack>
          <Stack
            gap="10px"
            minHeight={500}
            maxHeight="500px"
            py={2}
            overflow="auto"
          >
            {searchData?.map((item) => {
              return (
                <ProductSelectRow
                  value={value}
                  onChange={onChange}
                  key={item?.uid}
                  {...item}
                  handleClose={handleClose}
                />
              );
            })}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

SelectExtraProduct.defaultProps = {
  input: {
    value: [],
    onChange: () => {},
  },
};

export default SelectExtraProduct;
