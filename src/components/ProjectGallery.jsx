import { Box } from "@mui/material";

const images = require.context('../../public/images', true);

function getImage(str) {
    try {
        return images("./" + str)
    }
    catch {
        return ""
    }
}

function ProjectGallery({ images, title }) {
    return(
        <Box sx={{ flex: 0.7 }}>
            <img style={{ width: '100%' }} src={getImage(images[0])} alt={title}/>
        </Box>
    )
}

export default ProjectGallery;
