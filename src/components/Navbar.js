import './Navbar.css';

function Navbar({ pages, startVal, onChange }) {
    return(
        <div className="tab">
            {pages.map((val, index) =>
                <button
                    className={startVal === index ? "tab-link active" : "tab-link"}
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
