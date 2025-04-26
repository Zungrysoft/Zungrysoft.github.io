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
            height: '100%',
            width: '100%',
            justifySelf: 'center',
        }}>
            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                <ProjectContent project={project}/>
            </Box>
            {images && 
                <Box sx={{ flex: 0.7, minWidth: 0, maxWidth: '100%' }}>
                    <ProjectGallery images={images}/>
                </Box>
            }
            
        </Box>  
    )
}

export default Project;
