import ScrolShell from "../../MultiUsedParts/ScrolShell"

const ToDoBox = () => {
    return (
        <>
            <ScrolShell title="To Do's" onCreateButtonClicked={() => {}}>
                <div className="no_items">Nothing to do</div>
            </ScrolShell>
        </>
    )
}

export default ToDoBox;