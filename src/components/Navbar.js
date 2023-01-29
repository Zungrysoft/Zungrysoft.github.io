import './Navbar.css';


function Navbar({ projectData, startVal, onChange }) {
    return(
        <div className="tab">
            {projectData.pages.map((val,index) =>
                <button
                    className={startVal == index ? "tab-link active" : "tab-link"}
                    onClick={(e) => {
                        onChange(index)
                    }}
                    key={index}
                >{val.tab}</button>
            )}
        </div>
    )
}

export default Navbar;
