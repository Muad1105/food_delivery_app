import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import AdbIcon from "@mui/icons-material/Adb";
import ProductItemsDisplayNavSection from "./createItemSection/ProductItemsDisplayNavSection";

function Navbar() {
  return (
    <AppBar position="static" style={{ width: "100vw" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CARVDELI
          </Typography>

          <div className="ml-auto mr-auto">
            <ProductItemsDisplayNavSection />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
