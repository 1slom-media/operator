import { Avatar, Box, IconButton, Stack, styled } from "@mui/material";
import PropTypes from "prop-types";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRef } from "react";
import { useSelector } from "react-redux";

const StyledContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "max-content",
  height: "max-content",
}));

const AvatarUploader = ({ input }) => {
  const ref = useRef();
  const user = useSelector((state) => state.user.data);
  return (
    <StyledContainer>
      <Avatar
        src={input?.value ? URL.createObjectURL(input?.value) : user?.avatar}
        sx={{ width: 150, height: 150 }}
      />
      <input
        ref={ref}
        style={{ display: "none" }}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => input.onChange(e.target.files[0])}
      />
      <Stack
        sx={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          color="primary"
          onClick={() => ref.current.click()}
          sx={{
            background: "rgba(0, 0, 0, 0.9)",
            borderRadius: "50%",
            padding: "10px",
          }}
        >
          <CameraAltIcon />
        </IconButton>
      </Stack>
    </StyledContainer>
  );
};

AvatarUploader.propTypes = {
  image: PropTypes.string,
};

AvatarUploader.defaultProps = {
  image: "https://www.dyslexic.com/wp-content/uploads/2016/06/userimage.jpg",
};

export default AvatarUploader;
