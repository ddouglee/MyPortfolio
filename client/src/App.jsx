import React from 'react'; 
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import CssBaseline from '@mui/material/CssBaseline'; 
import MainRouter from '../MainRouter.jsx';
import theme from '../src/theme.jsx';
const App = () => {
return (
<Router>
<ThemeProvider theme={theme}>
<CssBaseline /> 
<MainRouter />
</ThemeProvider>
</Router>
);
};
export default App;
