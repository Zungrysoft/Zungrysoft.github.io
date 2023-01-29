

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
                    </div>
                    <img src="https://www.w3schools.com/images/img_fullaccess_300.png"/>
                </div>
            )}
        </div>
    );
}

export default ProjectPage;
