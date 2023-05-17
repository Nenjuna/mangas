import { AppBar, Typography, Toolbar } from "@mui/material";
// import AppBar from "@mui/material/AppBar";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import Stack from "@mui/material/Stack";

import Link from "next/link";
export default function Header() {
  return (
    <>
      <AppBar
        component="nav"
        sx={{
          alignItems: {
            xs: "center",
            lg: "start",
          },
        }}
      >
        <Stack direction="row" spacing={2}>
          <Toolbar>
            <BookOnlineOutlinedIcon
              sx={{
                fontSize: "36px",
                display: {
                  xs: "block",
                  lg: "none",
                },
              }}
            />
            <Link href="/">
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                  display: {
                    xs: "none",
                    lg: "block",
                  },
                }}
              >
                Manga Reader
              </Typography>
            </Link>
          </Toolbar>
        </Stack>
      </AppBar>
    </>
  );
}
