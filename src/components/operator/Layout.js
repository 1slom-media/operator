import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Container, Stack } from "@mui/material";
import { useRouter } from "next/router";
import CastIcon from "@mui/icons-material/Cast";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "redux-store/user/user.slice";

export default function OperatorLayout({ children }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);
  const router = useRouter();

  React.useEffect(() => {
    if (!token) {
      router.push("/");
    }
    if (token) {
      dispatch(getUser({ token, server }));
    }
  }, [token]);

  return (
    <Stack>
      <Container sx={{ pt: 4, pb: 10 }}>{children}</Container>
      <Box
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1200 }}
      >
        <BottomNavigation
          showLabels
          value={
            router?.pathname?.includes("/operator/dashboard/my-orders")
              ? "/operator/dashboard/my-orders/status/new"
              : router?.pathname
          }
          onChange={(event, newValue) => {
            router.push(newValue);
          }}
        >
          <BottomNavigationAction
            value={"/operator/dashboard"}
            label="Oqim"
            icon={<CastIcon />}
          />
          <BottomNavigationAction
            value={"/operator/dashboard/taken"}
            label="Olinganlar"
            icon={<PlaylistAddCheckIcon />}
          />
          <BottomNavigationAction
            value={"/operator/dashboard/my-orders/status/new"}
            label="Buyurtmalar"
            icon={<ReceiptLongIcon />}
          />
          <BottomNavigationAction
            value={"/operator/dashboard/search"}
            label="Qidiruv"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            value={"/operator/dashboard/profile"}
            label="Profil"
            icon={<AccountCircleOutlinedIcon />}
          />
        </BottomNavigation>
      </Box>
    </Stack>
  );
}
