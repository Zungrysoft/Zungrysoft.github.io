import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

const imagesContext = require.context("../../public/images", true);

function getImage(str) {
    try {
        return {
            src: imagesContext("./" + str),
            srcCompressed: imagesContext("./compressed/" + str.replace('.png', '.jpg')),
        }
    } catch {
        return {
            src: "",
            srcCompressed: "",
        };
    }
}

function ProjectGallery({ images, aspectRatio }) {
    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down("sm"));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const imageList = images.map(getImage);

    const hasMultipleImages = imageList.length > 1;
    const showControls = hasMultipleImages && (isHovered || isCompact);

    const previousImage = () => {
        setCurrentIndex((i) =>
            i === 0 ? imageList.length - 1 : i - 1
        );
    };

    const nextImage = () => {
        setCurrentIndex((i) =>
            i === imageList.length - 1 ? 0 : i + 1
        );
    };

    const containerStyle = aspectRatio
        ? {
              width: "100%",
              aspectRatio,
              position: "relative",
              overflow: "hidden",
              background: "black",
          }
        : {
              width: "100%",
              position: "relative",
          };

    const imageStyle = aspectRatio
        ? {
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
          }
        : {
              width: "100%",
              height: "auto",
              display: "block",
          };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: "100%",
                position: "relative",
            }}
        >
            <div style={containerStyle}>
                <img
                    src={imageList[currentIndex].srcCompressed}
                    alt=""
                    loading="lazy"
                    onClick={() => window.open(imageList[currentIndex].src, "_blank")}
                    style={{
                        ...imageStyle,
                        cursor: "zoom-in",
                    }}
                />

                {showControls && (
                    <>
                        <button
                            onClick={previousImage}
                            style={{
                                position: "absolute",
                                left: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 2,
                                border: "none",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                cursor: "pointer",
                                background: "rgba(0,0,0,0.5)",
                                color: "white",
                                fontSize: "20px",
                            }}
                        >
                            ‹
                        </button>

                        <button
                            onClick={nextImage}
                            style={{
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 2,
                                border: "none",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                cursor: "pointer",
                                background: "rgba(0,0,0,0.5)",
                                color: "white",
                                fontSize: "20px",
                            }}
                        >
                            ›
                        </button>
                    </>
                )}

                {showControls && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: "8px",
                            zIndex: 2,
                        }}
                    >
                        {imageList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    borderRadius: "50%",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    background:
                                        index === currentIndex
                                            ? "white"
                                            : "rgba(255,255,255,0.5)",
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectGallery;
