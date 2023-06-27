const images = require.context('../../public/images', true);

function getImage(str) {
    try {
        return images("./" + str)
    }
    catch {
        return ""
    }
}

function dataFormat(str, escherDownloads) {
    if (str.includes("**escher_downloads**")) {
        str = str.replace("**escher_downloads**", escherDownloads)
    }

    return str
}

function Project({ projectData, escherDownloads }) {
    return(
        <div className="bounding-box">
            <div className="inner-box">
                <h4>{projectData.title}</h4>
                <p>{dataFormat(projectData.description, escherDownloads)}</p>
                {projectData.links ? projectData.links.map((link, index) =>
                    <div>
                        <a target="blank" rel="noopener noreferrer" href={link.url}>{link.text}</a>
                    </div>
                ):<div/>}
                <p className="date">{projectData.dateDisplay}</p>
            </div>
            <img className="sideImage" src={getImage(projectData.image)} alt={projectData.title}/>
        </div>
    )
}

export default Project;
