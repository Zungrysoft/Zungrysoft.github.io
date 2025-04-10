import React,{useState} from 'react';
import './App.css';

import ProjectPage from './pages/ProjectPage.js';

import Navbar from './components/Navbar.js';

import pageData from './data/pages.json';

function App() {
    const [pageIndex, setPageIndex] = useState(0);
    const pages = pageData.filter(x => !x.hidden);
    return (
        <div className="App">
            <div className="header-background">
                <h1>Zungrysoft Entertainment Inc.</h1>
            </div>
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
        </div>
    );
}

export default App;
