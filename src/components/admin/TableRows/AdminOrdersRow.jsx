import { Chip, Checkbox, Stack } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import { getCity, getColor, getStatusText } from "utils/helpers";
import ConfirmArchivemodal from "../Modals/ConfirmArchivemodal";
import { StyledEditeBtn } from "./ProductsRow";
import PropTypes from "prop-types";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import ViewIcon from "components/icons/ViewIcon";
import Link from "next/link";
import { handleOrderCheck } from "redux-store/checkbox/checkbox.slice";
import { useDispatch, useSelector } from "react-redux";

const AdminOrdersRow = ({
  number,
  name,
  phone,
  createdAt,
  city_id,
  takenById,
  isTaken,
  status,
  orderItems,
  prevStatus,
  _id,
  page,
  statusFilter,
}) => {
  const price = orderItems.reduce((a, b) => {
    let total = b.price ? b.price : b.productId?.price;
    let quantity = b.quantity ? b.quantity : b.productId?.quantity;
    return a + total * quantity;
  }, 0);
  const count = orderItems.reduce((a, b) => {
    return a + b.quantity;
  }, 0);

  const dispatch = useDispatch();
  const checkedList = useSelector((state) => state.checkbox.orders);

  const handleCheck = () => {
    dispatch(handleOrderCheck(_id));
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Checkbox checked={checkedList.includes(_id)} onChange={handleCheck} />
      </StyledTableCell>
      <StyledTableCell align="left">{number}</StyledTableCell>
      <StyledTableCell align="left">{name?.slice(0, 10)}</StyledTableCell>
      <StyledTableCell align="center">{phone}</StyledTableCell>
      <StyledTableCell align="center">{count} dona</StyledTableCell>
      <StyledTableCell align="center">{getCity(city_id)}</StyledTableCell>
      <StyledTableCell align="center">
        {createdAt
          ? format(new Date(createdAt), "dd/MM/yyyy, HH:mm", { locale: uz })
          : ""}
      </StyledTableCell>
      <StyledTableCell align="center">
        {price.toLocaleString()} so&apos;m
      </StyledTableCell>
      <StyledTableCell align="center">
        {isTaken ? (
          <Chip
            size="small"
            label={takenById.name}
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: `success.900`,
              backgroundColor: `success.200`,
            }}
          />
        ) : (
          <Chip
            size="small"
            label="Olinmagan"
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: `error.900`,
              backgroundColor: `error.200`,
            }}
          />
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Chip
          size="small"
          label={getStatusText(status)}
          sx={{
            p: "0.25rem 0.5rem",
            fontSize: 12,
            color: !!getColor(status) ? `${getColor(status)}.900` : "inherit",
            backgroundColor: `${!!getColor(status)}.200`
              ? `${getColor(status)}.200`
              : "none",
          }}
        />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Link href={`/admin/orders/edit/${_id}`}>
            <StyledEditeBtn>
              <ViewIcon />
            </StyledEditeBtn>
          </Link>
          <ConfirmArchivemodal
            prevStatus={prevStatus}
            error={
              status === "archived"
                ? "Ushbu buyurtma arxivdan chiqarilmoqda! Tasdiqlaysizmi"
                : "Ushbu buyurtma arxivlanmoqda. Tasdiqlaysizmi?"
            }
            status={status}
            id={_id}
            page={page}
            statusFilter={statusFilter}
          />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

AdminOrdersRow.propTypes = {
  orderItems: PropTypes.arr,
};

AdminOrdersRow.defaultProps = {
  orderItems: [],
};

export default AdminOrdersRow;
