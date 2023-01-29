import React,{useState} from 'react';
import './App.css';

import ProjectPage from './pages/Project.js';

import Navbar from './components/Navbar.js';

import projectData from './data/projects.json';

function App() {
    const [page, setPage] = useState(0);
    return (
        <div className="App">
            <Navbar
                projectData={projectData}
                startVal={page}
                onChange={setPage}
            />
            <header className="App-header">
                <div>
                    {/* Pages */}
                    {/* {page==-1 ?
                        <MainPage
                            data={data}
                            onChange={setData}
                            version={settings.version}
                        />
                    :<div/>} */}
                    {page>=0 ?
                        <ProjectPage
                            data={projectData.pages[page]}
                        />
                    :<div/>}
                </div>
            </header>
        </div>
    );
}

export default App;