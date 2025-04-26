import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
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

function ProjectGallery({ images }) {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));
    const [isHovered, setIsHovered] = useState(false);

    const imageList = images.map(x => (
        {
            original: getImage(x),
            thumbnail: getImage(x),
        }
    ))

    return(
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <ImageGallery
                items={imageList}
                showThumbnails={imageList.length > 1}
                showPlayButton={false}
                slideDuration={140}
                useTranslate3D={false}
                showNav={isHovered || isCompact}
                showFullscreenButton={isHovered && !isCompact}
                disableKeyDown={true}
            />
        </div>
    )
}

export default ProjectGallery;
