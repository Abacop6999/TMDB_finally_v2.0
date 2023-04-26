import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
  {
    display: "Inicio",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home",
  },
  {
    display: "Peliculas",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie",
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <LiveTvOutlinedIcon />,
    state: "tv",
  },
  {
    display: "Buscar",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search",
  },
];

const user = [
  {
    display: "favoritos",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "favorite",
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    state: "reviews",
  },
  {
    display: "actualizar contraseña",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password.update",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
