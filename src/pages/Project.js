const images = require.context('../../public/images', true);

function getImage(str) {
    try {
        return images("./" + str)
    }
    catch {
        return ""
    }
}

function ProjectPage({ data }) {
    return (
        <div>
            <h2>{data.title}</h2>
            <h4>{data.description}</h4>
            {data.projects.map((val,index) =>
                <div className="bounding-box">
                    <div>
                        <h4>{val.title}</h4>
                        <p>{val.description}</p>
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
