import { createTheme } from "@mui/material";

export const THEME = createTheme({
    breakpoints: {
        values: {
            xxs: 0,
            xs: 768,
            sm: 1024,
            md: 1280,
            lg: 1440,
            xl: 1920,
            xxl: 2560,
        },
    },
});