import React from "react";
import Snowfall from "react-snowfall";
import { Paper, Stack, Button, Box, Typography } from "@mui/material";
import Container from "./Container";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper
        square={true}
        sx={{
          backgroundImage: "unset",
          padding: "1rem",
          position: "relative",
          //minHeight: "100vh",
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
        <Stack
          alignItems="center"
          justifyContent="center"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Typography variant="body1">
            Copyright © 2023 AbacopCalderón
          </Typography>
          <Snowfall
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            snowflakeCount={30}
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
