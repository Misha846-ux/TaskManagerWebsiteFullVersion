import "../../../Styles/MultiUsedStyles/MainPageLines.css"
import MembersBox from "./MembersBox";
import ToDoBox from "./ToDoBox";


const FourthLine = () => {
    return (
        <div className="Line">
            <div className="HalfLine">
                <MembersBox/>
            </div>
            <div className="HalfLine">
                <ToDoBox/>
            </div>
        </div>
    )
}
export default FourthLine;