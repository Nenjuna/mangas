import { AppBar, Typography, Toolbar } from "@mui/material";
// import AppBar from "@mui/material/AppBar";
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
        <Toolbar>
          <Link href="/">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Manga Reader
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
