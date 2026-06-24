import React,{useState} from 'react';
import './App.css';

import ProjectPage from './pages/ProjectPage.js';

import Navbar from './components/Navbar.js';

import pageData from './data/pages.json';
import { Box, ThemeProvider } from '@mui/material';
import { EscherDownloadsProvider } from './context/EscherDownloadsContext.jsx';
import { THEME } from './config/theme.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavTabs from './components/NavTabs.js';

function App() {
    const [pageIndex, setPageIndex] = useState(0);
    const pages = pageData.filter(x => !x.hidden);

    return (
        <ThemeProvider theme={THEME}>
            <Box className="App">
                <BrowserRouter>
                    <EscherDownloadsProvider>
                        <Box sx={{ margin: '8px' }}>
                            <h1>Zungrysoft Entertainment Inc.</h1>
                        </Box>
                        <NavTabs
                            tabs={pages.map((p) => ({ title: p.tab, url: "/" + p.urlExtension }))}
                        />
                        <header className="App-header">
                            <div>
                                <Routes>
                                    {pages.map((p, i) => <Route
                                        path={"/" + p.urlExtension}
                                        element={<ProjectPage data={p}/>}
                                        key={p.urlExtension}
                                    />)}
                                </Routes>
                            </div>
                        </header>
                    </EscherDownloadsProvider>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
