import { Stack, Typography } from "@mui/material";
import * as animationData from "../lottie-anima/search.json";
import Lottie from "react-lottie";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Stack minHeight="70vh" alignItems="center" justifyContent="center">
      <Lottie options={defaultOptions} height={250} width={250} />
    </Stack>
  );
};

export default Loader;
