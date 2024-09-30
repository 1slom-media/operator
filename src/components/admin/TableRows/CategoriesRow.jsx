import { Avatar, Box, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React, { useState } from "react";
import { StyledEditeBtn } from "./ProductsRow";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal.jsx ";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import ViewIcon from "components/icons/ViewIcon";
import Link from "next/link";
import CategoryUpdateModal from "../Modals/CategoryUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminCategory } from "redux-store/admin/category/delete.slice";
import useAlert from "hooks/useAlert";
import { getAllCategoryAction } from "redux-store/admin/category/get.slice";

const CategoriesRow = ({ label, uid, avatar, createdAt, updatedAt, _id }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.categoryDelete.isLoading);
  const alert = useAlert();
  const server = useSelector((state) => state.settings.site_server);

  const callback = () => {
    dispatch(getAllCategoryAction({ token, params: {}, server }));
  };

  const handleDelete = (values) => {
    dispatch(
      deleteAdminCategory({
        uid,
        token,
        alert,
        callback,
        close: () => setModal(!modal),
        server,
      })
    );
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Avatar alt="img" src={avatar} />
      </StyledTableCell>

      <StyledTableCell align="left">
        <Typography
          bgcolor="background.gray"
          variant="subtitle1"
          color="secondary.100"
          align="center"
          borderRadius="25px"
          width="80%"
          p={1}
        >
          {label}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          {uid}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          {createdAt
            ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
            : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          {updatedAt
            ? format(new Date(updatedAt), "dd-MMMM, HH:mm", { locale: uz })
            : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box display="flex" alignItems="right" justifyContent="right" gap={2}>
          <Link href={`/admin/categories/${uid}`}>
            <StyledEditeBtn>
              <ViewIcon />
            </StyledEditeBtn>
          </Link>
          <CategoryUpdateModal
            initialValues={{
              label: label,
              _id: _id,
              avatar: null,
              image: avatar,
              uid: uid,
            }}
          />
          <ConfirmDeleteModal
            isOpen={modal}
            handleDeleteModal={() => setModal(!modal)}
            error="Ushbu Kategoriyani o'chirilmoqda. Tasdiqlaysizmi?"
            handleDelete={handleDelete}
            loading={isLoading}
          />
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CategoriesRow;
