import { blue, red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[800]
    },
    secondary: {
      main: '#000000'
    },
    error: {
      main: red[900],
      light: red[600]
    }
  }
});

export default theme;
