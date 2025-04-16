import React,{useState} from 'react';
import './App.css';

import ProjectPage from './pages/ProjectPage.js';

import Navbar from './components/Navbar.js';

import pageData from './data/pages.json';
import { Box, ThemeProvider } from '@mui/material';
import { EscherDownloadsProvider } from './context/EscherDownloadsContext.jsx';
import { THEME } from './config/theme.js';

function App() {
    const [pageIndex, setPageIndex] = useState(0);
    const pages = pageData.filter(x => !x.hidden);
    return (
        <ThemeProvider theme={THEME}>
            <Box className="App">
                <EscherDownloadsProvider>
                    <Box sx={{ margin: '8px' }}>
                        <h1>Zungrysoft Entertainment Inc.</h1>
                    </Box>
                    <Navbar
                        pages={pages}
                        startVal={pageIndex}
                        onChange={setPageIndex}
                    />
                    <header className="App-header">
                        <div>
                            {pageIndex >=0 ?
                                <ProjectPage
                                    data={pages[pageIndex]}
                                    pageIndex={pageIndex}
                                />
                            :<div/>}
                        </div>
                    </header>
                </EscherDownloadsProvider>
            </Box>
        </ThemeProvider>
    );
}

export default App;
