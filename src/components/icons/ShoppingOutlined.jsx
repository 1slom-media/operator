import { SvgIcon } from "@mui/material";
import React from "react";

const ShoppingOutlined = (props) => {
  return (
    <SvgIcon
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.9963 2.13193C11.4758 2.40594 11.6424 3.01679 11.3684 3.49631L8.22345 9H16.7769L13.6319 3.49631C13.3579 3.01679 13.5245 2.40594 14.004 2.13193C14.4836 1.85792 15.0944 2.02451 15.3684 2.50403L19.0804 9H21.5C21.8117 9 22.1055 9.14532 22.2947 9.39301C22.4839 9.64069 22.5468 9.96243 22.4648 10.2631L20.2686 18.3156C19.6754 20.4909 17.6996 22 15.4448 22H9.55519C7.30044 22 5.32464 20.4909 4.73137 18.3156L2.53525 10.2631C2.45324 9.96243 2.51612 9.64069 2.7053 9.39301C2.89449 9.14532 3.18834 9 3.50001 9H5.91995L9.63193 2.50403C9.90594 2.02451 10.5168 1.85792 10.9963 2.13193ZM18.475 11C18.4924 11.0005 18.5098 11.0005 18.5272 11H20.1908L18.3391 17.7894C17.9832 19.0945 16.7977 20 15.4448 20H9.55519C8.20234 20 7.01686 19.0945 6.6609 17.7894L4.80926 11H6.47311C6.49056 11.0005 6.50799 11.0005 6.52539 11H18.475Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
    </SvgIcon>
  );
};

export default ShoppingOutlined;
