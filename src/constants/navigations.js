import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import CreditCardIcon from "@mui/icons-material/CreditCard";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

export const customerNavigations = [
  {
    _id: 2019,
    href: "/admin/users/profile",
    outlined: AccountCircleOutlinedIcon,
    contained: AccountCircleIcon,
    label: "Shaxsiy malumotlar"
  },
  {
    _id: 2021,
    href: "/admin/users/payment",
    outlined: CreditCardIcon,
    contained: CreditCardIcon,
    label: "To'lovlar"
  },
  {
    _id: 2020,
    href: "/admin/users/orders",
    outlined: ShoppingBasketOutlinedIcon,
    contained: ShoppingBasketIcon,
    label: "Buyurtmalar"
  },
  {
    _id: 2022,
    href: "/admin/users/password",
    outlined: LockOutlinedIcon,
    contained: LockIcon,
    label: "Parolni yangilash"
  },
  {
    _id: 2023,
    href: "/admin/users/settings",
    outlined: SettingsOutlinedIcon,
    contained: SettingsIcon,
    label: "Sozlamalar"
  },
];

export const operatorNavigations = [
  {
    _id: 2019,
    href: "/admin/operators/profile",
    outlined: AccountCircleOutlinedIcon,
    contained: AccountCircleIcon,
    label: "Shaxsiy malumotlar"
  },
  {
    _id: 2021,
    href: "/admin/operators/payment",
    outlined: CreditCardIcon,
    contained: CreditCardIcon,
    label: "To'lovlar"
  },
  {
    _id: 2020,
    href: "/admin/operators/orders",
    outlined: ShoppingBasketOutlinedIcon,
    contained: ShoppingBasketIcon,
    label: "Buyurtmalar"
  },
  {
    _id: 2022,
    href: "/admin/operators/password",
    outlined: LockOutlinedIcon,
    contained: LockIcon,
    label: "Parolni yangilash"
  },
  {
    _id: 2023,
    href: "/admin/operators/settings",
    outlined: SettingsOutlinedIcon,
    contained: SettingsIcon,
    label: "Sozlamalar"
  },
];
