function StoredItem({ data, onClick, onDelete }) {
    let displayName = data.name.text === "" ? "Unnamed Item" : data.name.text;
    return (
        <div>
            <button
                className="stored-item"
                onClick={(e) => {onClick()}}
            >{displayName}</button>
            <button
                className="stored-item-delete"
                onClick={(e) => {
                    // Prompt the user to make sure they don't delete by accident
                    let openTime = new Date();
                    let confirmed = window.confirm("Are you sure you want to delete " + displayName + "?");
                    let closeTime = new Date();
                    
                    // If the user disabled this popup (ie, it was closed instantly by the browser),
                    // then always delete the item
                    if (closeTime - openTime < 5 || confirmed) {
                        onDelete()
                    }
                }}
            >X</button>
        </div>
    )
}

export default StoredItem;
