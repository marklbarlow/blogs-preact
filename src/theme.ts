import { createTheme } from '@mui/material';
import { indigo, pink } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink['A200'],
    },
  },
});
