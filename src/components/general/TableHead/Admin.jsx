import {
  Checkbox,
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: theme.palette.background.gray,
  borderRadius: "8px",
  width: "100%",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: "16px 20px",
  color: theme.palette.primary.contrastText,
}));

const AdminTableHeader = (props) => {
  const {
    order,
    heading,
    orderBy,
    rowCount,
    numSelected,
    onRequestSort,
    onSelectAll,
    hideSelectBtn,
    checked,
  } = props;
  return (
    <StyledTableHead>
      <TableRow>
        {!hideSelectBtn && <StyledTableCell align="left"></StyledTableCell>}
        {heading.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={() => onRequestSort(headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              sx={{
                "& .MuiTableSortLabel-icon": {
                  opacity: 1,
                },
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </StyledTableHead>
  );
};

AdminTableHeader.propTypes = {
  order: PropTypes.string,
  heading: PropTypes.array,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func,
  onSelectAll: PropTypes.func,
  checked: PropTypes.bool,
  hideSelectBtn: PropTypes.bool,
  disableSort: PropTypes.bool,
};

AdminTableHeader.defaultProps = {
  order: "",
  heading: [],
  orderBy: "",
  onRequestSort: () => {},
  onSelectAll: () => {},
  checked: false,
  hideSelectBtn: false,
  disableSort: false,
};

export default AdminTableHeader;
