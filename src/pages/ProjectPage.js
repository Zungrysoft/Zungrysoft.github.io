import React,{useState, useEffect} from 'react';
import Project from '../components/Project';

function getEscherDownloads(setEscherDownloads) {
    fetch('https://api.github.com/repos/ZungrySoft/The-Escher-Dimension/releases')
        .then(response => response.json())
        .then(data => {
            let total = 0
            for (let release of data) {
                for (let asset of release.assets) {
                    total += asset.download_count
                }
            }
            setEscherDownloads(total)
        });
}

function ProjectPage({ data, pageIndex }) {
    const [escherDownloads, setEscherDownloads] = useState("over 12000");

    // Validation
    useEffect(() => {
        // No sounds to cancel. Set nosound to false
        if (escherDownloads === "over 12000") {
            getEscherDownloads(setEscherDownloads)
        }
    }, [escherDownloads]);

    return (
        <div>
            <h2 style={{ margin: '16px' }}>{data.title}</h2>
            <h4 style={{ marginBottom: '16px' }}>{data.description}</h4>
            {data.projects.map((val, index) =>
                <Project key={`${pageIndex}_${index}`} project={val} escherDownloads={escherDownloads}/>
            )}
        </div>
    );
}

export default ProjectPage;
