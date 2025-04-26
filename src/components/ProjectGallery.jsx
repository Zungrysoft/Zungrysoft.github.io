import { Box } from "@mui/material";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

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
    console.log(images)
    const imageList = images.map(x => (
        {
            original: getImage(x),
        }
    ))

    return(
        <ImageGallery
            items={imageList}
            showBullets={imageList.length > 1}
            showPlayButton={false}
            slideDuration={140}
        />
    )
}

export default ProjectGallery;
