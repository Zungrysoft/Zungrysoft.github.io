import React, { useEffect } from 'react';
import Project from '../components/Project';
import { useEscherDownloads } from '../context/EscherDownloadsContext';

function ProjectPage({ data, pageIndex }) {
    const { fetchEscherDownloads } = useEscherDownloads();

    useEffect(() => {
        fetchEscherDownloads();
    }, []);

    return (
        <div>
            <h2 style={{ margin: '16px' }}>{data.title}</h2>
            <h4 style={{ marginBottom: '16px' }}>{data.description}</h4>
            {data.projects.map((val, index) =>
                <Project key={`${pageIndex}_${index}`} project={val}/>
            )}
        </div>
    );
}

export default ProjectPage;
