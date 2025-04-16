import { Box, useMediaQuery, useTheme } from "@mui/material";
import ProjectGallery from "./ProjectGallery";
import { BACKGROUND_1 } from "../config/colors";
import ProjectContent from "./ProjectContent";

function Project({ project }) {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));

    let images = undefined;
    if (project.images) {
        images = project.images
    }
    else if (project.image) {
        images = [project.image]
    }

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: isCompact ? 'column' : 'row',
            backgroundColor: BACKGROUND_1,
            marginBottom: '16px',
            marginLeft: '16px',
            marginRight: '16px',
            height: '100%',
            maxWidth: '1920px',
        }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ProjectContent project={project}/>
            </Box>
            {project.image && 
                <Box sx={{ flex: 0.7 }}>
                    <ProjectGallery images={images} title={project.title} />
                </Box>
            }
            
        </Box>  
    )
}

export default Project;
