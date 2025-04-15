import { Box } from "@mui/material";
import { useCallback } from "react";

function ProjectContent({ project }) {
    const escherDownloads = 30;

    const dataFormat = useCallback((str) => {
        let ret = str = str.replaceAll("**escher_downloads**", escherDownloads);
    
        return ret;
    }, [escherDownloads])

    return(
        <Box sx={{ flex: 1, padding: 2, height: '100%', position: 'relative' }}>
            <h4 style={{ marginBottom: '16px' }}>{project.title}</h4>
            <p>{dataFormat(project.description, escherDownloads)}</p>
            {project.links ? project.links.map((link, index) =>
                <div key={index}>
                    <a target="blank" rel="noopener noreferrer" href={link.url}>{link.text}</a>
                </div>
            ):<div/>}
            <p style={{ position: 'absolute', bottom: '8px', right: '16px', fontStyle: 'italic' }}>{project.dateDisplay}</p>
        </Box>
    )
}

export default ProjectContent;
