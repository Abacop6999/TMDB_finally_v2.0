import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  const theme = useTheme();

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Typography
        fontWeight="700"
        fontSize="1.7rem"
        color={theme.palette.mode === "dark" ? "#fff" : "#000"}
      >
        Abacop<span style={{ color: theme.palette.primary.main }}>Pelis</span>
      </Typography>
    </Link>
  );
};

export default Logo;
