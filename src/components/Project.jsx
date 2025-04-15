import { Box } from "@mui/material";
import ProjectGallery from "./ProjectGallery";
import { BACKGROUND_1 } from "../config/colors";
import ProjectContent from "./ProjectContent";

function Project({ project }) {
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
            backgroundColor: BACKGROUND_1,
            marginBottom: '16px',
            marginLeft: '16px',
            marginRight: '16px',
            height: '100%',
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
