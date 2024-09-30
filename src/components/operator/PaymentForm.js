import { Card, Grid, Stack, Typography } from "@mui/material";
import { reduxForm, Field } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import { LoadingButton } from "@mui/lab";
import {
  useGetPayemntRequests,
  useMakePayemntRequest,
} from "redux-store/payment/payment.slice";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { uz } from "date-fns/locale";

export const paymentStatus = [
  { status: "accepted", label: "Qabul qilindi" },
  { status: "waiting", label: "Kutilmoqda" },
  { status: "fulfilled", label: "To'landi" },
  { status: "rejected", label: "Bekor qilindi" },
];

const columns = [
  { id: "uid", label: "ID", minWidth: 170 },
  { id: "card", label: "Karta raqami", minWidth: 100 },
  {
    id: "amount",
    label: "Miqdori",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "createdAt",
    label: "Vaqti",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Holati",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const PaymentForm = ({ userData, handleSubmit }) => {
  function createData(pay) {
    return {
      uid: pay.uid,
      card: pay.card,
      amount: `${pay.amount?.toLocaleString()} so'm`,
      status: paymentStatus?.find((item) => item.status === pay.status)?.label,
      createdAt: format(new Date(pay?.createdAt), "dd-MMMM, HH:mm", {
        locale: uz,
      }),
    };
  }

  const rows = [];
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const isLoading = useSelector((state) => state.payment.isLoading);
  const { countPage, payments } = useSelector((state) => state.payment.data);

  payments?.forEach((payment) => {
    rows.push(createData(payment));
  });
  const handleForm = (values) => {
    dispatch(
      useMakePayemntRequest({
        token,
        server,
        data: { amount: parseInt(values?.amount), card: values?.card },
      })
    );
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      useGetPayemntRequests({
        token,
        server,
        params: { page: page + 1, limit: rowsPerPage },
      })
    );
  }, []);

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background:
                "linear-gradient(rgba(22, 28, 36, 0.8), rgba(22, 28, 36, 0.8)) center center / cover no-repeat, url(/card2.jpg)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
            }}
          >
            <Stack p={2}>
              <Stack>
                <Typography
                  sx={{
                    fontFamily: "sans-serif",
                    opacity: "0.48",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  Hozirgi balans
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    mt: 1,
                  }}
                >
                  {userData?.balance?.toLocaleString()} so'm
                </Typography>
              </Stack>
              <Stack mt={3}>
                <Typography
                  sx={{
                    fontFamily: "sans-serif",
                    opacity: "0.48",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  To'lab berilgan summa
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    mt: 1,
                  }}
                >
                  {userData?.paid?.toLocaleString()} so'm
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack gap="15px">
            <Field
              component={TextInput}
              placeholder="To'lov kartasi"
              name="card"
            />
            <Field
              component={TextInput}
              placeholder="To'lov miqdori"
              name="amount"
              type="number"
            />
            <LoadingButton
              onClick={handleSubmit(handleForm)}
              variant="contained"
              loading={isLoading}
            >
              So'rov junatish
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
      <Stack py={5}>
        <Typography variant="h6" color="text.legacy">
          So'rovlar tarixi
        </Typography>
        <Stack>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={countPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

function validate(values, props) {
  let errors = {};

  const requiredFields = ["card", "amount"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Ushbu ustun to'ldirilishi shart";
    }
  });

  return errors;
}

export default reduxForm({
  form: "payment_send_form",
  validate,
  enableReinitialize: true,
})(PaymentForm);
