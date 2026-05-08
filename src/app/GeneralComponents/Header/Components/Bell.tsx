import { useState } from "react";
import { getChanges } from "../../../../Infrastructure/ControllersMethods/ChangeControllerMethods";
import type { ChangeType } from "../../../../Domain/Change/Change";
import "../../../Styles/GeneralComponentsStyles/Header/Bell.css";

type BellProps = {};

const Bell: React.FC<BellProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [changes, setChanges] = useState<ChangeType[]>([]);

    const handleToggle = async () => {
        if (!isOpen) {
            try {
                const data = await getChanges();
                setChanges(data);
            } catch (error) {
                console.error("Failed to load changes:", error);
            }
        }
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <button className="message_button" onClick={handleToggle}></button>
            {isOpen && <ChangeBox changes={changes} onClose={() => setIsOpen(false)} />}
        </>
    );
};

export default Bell;

type ChangeBoxProps = {
    changes: ChangeType[];
    onClose: () => void;
};

const ChangeBox: React.FC<ChangeBoxProps> = ({ changes, onClose }) => (
    <div className="Change_box" onMouseLeave={onClose}>
        <div className="Change_top">Changes</div>
        <div className="Change_context">
            {changes.length === 0 ? (
                <div className="No_changes">No changes</div>
            ) : (
                changes.map((item) => <ChangeMessageBox item={item} key={item.Id} />)
            )}
        </div>
    </div>
);

type ChangeItemProps = {
    item: ChangeType;
};

const ChangeMessageBox: React.FC<ChangeItemProps> = ({ item }) => (
    <div className="change_message_box">
        <div className="change_message">{item.Message}</div>
        <div className="change_time">{item.CreatedAt}</div>
    </div>
);
