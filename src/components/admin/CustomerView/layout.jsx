import { Grid, Stack, Box, styled } from "@mui/material";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import BreadCurmbsCustom from "components/admin/Dashboard/BreadCurmbs";
import React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getOperatorProfile } from "redux-store/admin/operators/operator.slice";
import { getCustomerProfile } from "redux-store/admin/customers/customers.slice";

const StyledMenuContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: 15,
  borderRadius: 20,
}));

const StyledMenuItem = styled(MenuItem)(({ theme, selected }) => ({
  borderRadius: 10,
  padding: "13px 10px",
  color: theme.palette.text.legacy,
  fontWeight: 600,
  marginBottom: "4px",
  ...(selected && {
    color: theme.palette.primary.main,
  }),
}));

const CustomerProfileLayout = ({ children, navs }) => {
  const [initialData, setInitialData] = React.useState([
    { label: "Adminlar", link: "/admin/users" },
  ]);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.customers?.customerProfile?.user);
  const operator = useSelector(
    (state) => state.operators?.customerProfile?.user
  );
  const token = useSelector((state) => state.auth.token);
  const server = useSelector((state) => state.settings.site_server);

  React.useEffect(() => {
    if (router.pathname.startsWith("/admin/operators") && token) {
      dispatch(
        getOperatorProfile({
          token,
          server,
          params: {
            userId: router.query.id,
            type: "info",
          },
        })
      );
    } else {
      dispatch(
        getCustomerProfile({
          token,
          server,
          params: {
            userId: router?.query?.id,
            type: "info",
          },
        })
      );
    }
    setInitialData([
      ...initialData,
      {
        label: router.pathname.startsWith("/admin/operators")
          ? operator?.name
          : user?.name,
      },
    ]);
  }, [router.query.id, router.pathname]);

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BreadCurmbsCustom list={initialData} />
        </Grid>
        <Grid item xs={12} md={2} lg={2.5}>
          <StyledMenuContainer>
            <MenuList>
              {navs.map((item) => {
                const path = `${item.href}/${router?.query?.id}`;
                const selected = router.pathname.includes(item.href);
                return (
                  <StyledMenuItem
                    selected={selected}
                    key={item._id}
                    onClick={() => router.push(path)}
                  >
                    <ListItemIcon>
                      {selected ? (
                        <item.contained color="primary" />
                      ) : (
                        <item.outlined />
                      )}
                    </ListItemIcon>
                    {item.label}
                  </StyledMenuItem>
                );
              })}
            </MenuList>
          </StyledMenuContainer>
        </Grid>
        <Grid item xs={12} md={10} lg={9.5}>
          {children}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CustomerProfileLayout;
