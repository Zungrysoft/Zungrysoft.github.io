import React,{useState, useEffect} from 'react';
const images = require.context('../../public/images', true);

function getImage(str) {
    try {
        return images("./" + str)
    }
    catch {
        return ""
    }
}

function getEscherDownloads(setEscherDownloads) {
    fetch('https://api.github.com/repos/ZungrySoft/The-Escher-Dimension/releases')
        .then(response => response.json())
        .then(data => {
            let total = 0
            for (let release of data) {
                for (let asset of release.assets) {
                    total += asset.download_count
                }
            }
            setEscherDownloads(total)
        });
}

function dataFormat(str, escherDownloads) {
    if (str.includes("**escher_downloads**")) {
        str = str.replace("**escher_downloads**", escherDownloads)
    }
    
    return str
}

function ProjectPage({ data }) {
    const [escherDownloads, setEscherDownloads] = useState("over 12000");

    // Validation
    useEffect(() => {
        // No sounds to cancel. Set nosound to false
        if (escherDownloads === "over 12000") {
            getEscherDownloads(setEscherDownloads)
        }
    }, [escherDownloads]);

    return (
        <div>
            <h2>{data.title}</h2>
            <h4>{data.description}</h4>
            {data.projects.map((val,index) =>
                <div className="bounding-box">
                    <div>
                        <h4>{val.title}</h4>
                        <p>{dataFormat(val.description, escherDownloads, setEscherDownloads)}</p>
                        {val.links ? val.links.map((link, index) =>
                            <div>
                                <a target="blank" rel="noopener noreferrer" href={link.url}>{link.text}</a>
                            </div>
                        ):<div/>}

                    </div>
                    <img className="sideImage" src={getImage(val.image)}/>
                </div>
            )}
        </div>
    );
}

export default ProjectPage;
