import { Box } from "@mui/material";
import { useEscherDownloads } from "../context/EscherDownloadsContext";

function ProjectContent({ project }) {
    const  { escherDownloads } = useEscherDownloads();

    let projectDescription = project.description;
    if (projectDescription.includes('**escher_downloads**')) {
        projectDescription = projectDescription.replaceAll("**escher_downloads**", escherDownloads);
    }

    return(
        <>
            <Box sx={{ flex: 0, padding: 2 }}>
                <h4 style={{ marginBottom: '16px' }}>{project.title}</h4>
                <p>{projectDescription}</p>
            </Box>
            <Box sx={{ flex: 1, padding: 2, paddingTop: 0, minHeight: '16px', position: 'relative' }}>
                {project.links ? project.links.map((link, index) =>
                    <div key={index}>
                        <a target="blank" rel="noopener noreferrer" href={link.url}>{link.text}</a>
                    </div>
                ):<div/>}
                <p style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '16px',
                    fontStyle: 'italic',
                }}>{project.dateDisplay}</p>
            </Box>
        </>
    )
}

export default ProjectContent;
