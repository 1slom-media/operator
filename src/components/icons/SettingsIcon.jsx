import { SvgIcon } from "@mui/material";
import React from "react";

const SettingsOutlined = (props) => {
  return (
    <SvgIcon
      {...props}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.58281 4.1257C9.70349 2.91896 10.7189 2 11.9317 2H13.069C14.2819 2 15.2973 2.9191 15.4179 4.12577C15.4466 4.41213 15.7825 4.55104 16.0049 4.36904C16.9435 3.60111 18.3113 3.66933 19.1688 4.52684L19.9731 5.33114C20.8306 6.18869 20.8988 7.55654 20.1309 8.49516C19.9488 8.71774 20.0878 9.0537 20.3742 9.08234C21.5809 9.20301 22.5 10.2185 22.5 11.4313V12.5687C22.5 13.7814 21.5811 14.7968 20.3744 14.9175C20.0883 14.9461 19.9491 15.2818 20.1313 15.5045C20.8992 16.4431 20.8311 17.811 19.9735 18.6686L19.1693 19.4728C18.3117 20.3304 16.9439 20.3986 16.0052 19.6306C15.7827 19.4485 15.4466 19.5875 15.418 19.874C15.2973 21.0808 14.2818 22 13.0689 22H11.9319C10.719 22 9.70348 21.081 9.58279 19.8741C9.55417 19.5879 9.21814 19.4485 8.99522 19.6309C8.05652 20.3989 6.68845 20.3308 5.83075 19.4731L5.02683 18.6692C4.16918 17.8115 4.10104 16.4435 4.86904 15.5049C5.05134 15.2821 4.91205 14.9461 4.62581 14.9175C3.41901 14.7968 2.5 13.7813 2.5 12.5685V11.4315C2.5 10.2185 3.41917 9.203 4.62601 9.08232C4.91256 9.05366 5.05164 8.71751 4.86945 8.49484C4.10142 7.55614 4.16965 6.18819 5.02727 5.33057L5.83129 4.52654C6.68895 3.66889 8.05693 3.60082 8.99555 4.36878C9.21838 4.5511 9.55421 4.41172 9.58281 4.1257ZM11.9317 4C11.7464 4 11.5913 4.14037 11.5729 4.3247C11.3855 6.1989 9.18649 7.10913 7.72907 5.9167C7.58558 5.79929 7.37649 5.80977 7.24551 5.94076L6.44148 6.74478C6.31042 6.87585 6.29999 7.08491 6.41736 7.22836C7.61014 8.6862 6.69901 10.885 4.82502 11.0724C4.64049 11.0908 4.5 11.2461 4.5 11.4315V12.5685C4.5 12.7538 4.64042 12.909 4.82482 12.9274C6.699 13.1148 7.60952 15.3138 6.41695 16.7714C6.29955 16.9148 6.31001 17.1239 6.44104 17.255L7.24496 18.0589C7.37602 18.1899 7.58519 18.2004 7.72874 18.083C9.18633 16.8904 11.3854 17.8008 11.5729 19.6751C11.5913 19.8595 11.7465 20 11.9319 20H13.0689C13.2541 20 13.4094 19.8595 13.4279 19.675C13.6153 17.8012 15.8139 16.8899 17.2717 18.0827C17.4151 18.2 17.6241 18.1896 17.7551 18.0586L18.5593 17.2544C18.6903 17.1234 18.7007 16.9144 18.5834 16.771C17.3909 15.3136 18.3013 13.1148 20.1754 12.9274C20.3597 12.909 20.5 12.7539 20.5 12.5687V11.4313C20.5 11.246 20.3596 11.0909 20.1752 11.0724C18.3013 10.885 17.3903 8.68639 18.583 7.22869C18.7003 7.0853 18.6899 6.87635 18.5589 6.74535L17.7546 5.94105C17.6236 5.8101 17.4147 5.79968 17.2714 5.91696C15.8137 7.10961 13.6152 6.19848 13.4279 4.32478C13.4094 4.14038 13.2542 4 13.069 4H11.9317Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.5 10C11.3954 10 10.5 10.8954 10.5 12C10.5 13.1046 11.3954 14 12.5 14C13.6046 14 14.5 13.1046 14.5 12C14.5 10.8954 13.6046 10 12.5 10ZM8.5 12C8.5 9.79086 10.2909 8 12.5 8C14.7091 8 16.5 9.79086 16.5 12C16.5 14.2091 14.7091 16 12.5 16C10.2909 16 8.5 14.2091 8.5 12Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
    </SvgIcon>
  );
};

export default SettingsOutlined;
