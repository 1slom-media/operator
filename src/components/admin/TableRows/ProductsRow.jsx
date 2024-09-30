import { Box, Stack, Typography, IconButton, styled } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React, { useState } from "react";
import SwitchInput from "components/general/Inputs/Switch";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import EditIcon from "components/icons/EditIcon";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminProduct } from "redux-store/admin/products/delete.slice";
import {
  updateAdminProduct,
  setUpdateID,
} from "redux-store/admin/products/update.slice";
import useAlert from "hooks/useAlert";
import CircularProgress from "@mui/material/CircularProgress";

import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal.jsx ";
import Link from "next/link";

export const StyledEditeBtn = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  background: theme.palette.background.iconButtonLight,
  width: "35px",
  height: "35px",
}));

const ProductsRow = ({
  name,
  category,
  image,
  _id,
  createdAt,
  price,
  referal_price,
  active,
  callback,
}) => {
  const [modal, setModal] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isDeleteLoading = useSelector((state) => state.productDelete.isLoading);
  const isUpdateLoading = useSelector((state) => state.productUpdate.isLoading);
  const updateID = useSelector((state) => state.productUpdate.updateID);
  const server = useSelector((state) => state.settings.site_server);

  const deleteProduct = () => {
    dispatch(
      deleteAdminProduct({
        _id,
        alert,
        token,
        callback,
        close: () => setModal(!modal),
        server,
      })
    );
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack direction="row" justifyContent="flex-start" gap="10px">
          <Box
            component="img"
            alt={name}
            src={image}
            width="50px"
            height="50px"
            borderRadius="50%"
          />
          <Stack direction="column" justifyContent="space-between">
            <Typography variant="subtitle1" color="secondary.100">
              {name?.length > 15 ? `${name.slice(0, 15)}...` : name}
            </Typography>
            <Typography variant="subtitle1" color="secondary.100">
              {_id}
            </Typography>
          </Stack>
        </Stack>
      </StyledTableCell>

      <StyledTableCell align="left">{category}</StyledTableCell>
      <StyledTableCell align="left">
        {referal_price?.toLocaleString()} so&apos;m
      </StyledTableCell>
      <StyledTableCell align="left">
        {price?.toLocaleString()} so&apos;m
      </StyledTableCell>
      <StyledTableCell align="left">
        {isUpdateLoading && updateID === _id ? (
          <CircularProgress size={30} />
        ) : (
          <SwitchInput
            checked={active}
            onChange={(e) => {
              const data = new FormData();
              data.append("active", e.target.checked);
              dispatch(setUpdateID(_id));
              dispatch(
                updateAdminProduct({
                  data,
                  token,
                  _id,
                  callback,
                  alert,
                  server,
                })
              );
            }}
          />
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        {createdAt
          ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
          : ""}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box display="flex" alignItems="right" justifyContent="right" gap={2}>
          <Link href={`/admin/products/edit/${_id}`}>
            <StyledEditeBtn>
              <EditIcon />
            </StyledEditeBtn>
          </Link>
          <ConfirmDeleteModal
            isOpen={modal}
            handleDeleteModal={() => setModal(!modal)}
            handleDelete={deleteProduct}
            loading={isDeleteLoading}
            error="Ushbu mahsulot o'chirilmoqda. Tasdiqlaysizmi?"
          />
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

ProductsRow.defaultProps = {
  callback: () => {},
};

export default ProductsRow;
