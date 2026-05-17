import { useState } from "react";
import { getChanges } from "../../../../Infrastructure/ControllersMethods/ChangeControllerMethods";
import type { ChangeType } from "../../../../Domain/Change/Change";
import "../../../Styles/GeneralComponentsStyles/Header/Bell.css";

type BellProps = {};

const Bell: React.FC<BellProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [changes, setChanges] = useState<ChangeType[]>([]);

    const hasUnread = changes.length > 0;

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

    const handleMarkRead = (id: ChangeType["id"]) => {
        setChanges((prev) => prev.filter((change) => change.id !== id));
    };

    return (
        <>
            <button className="message_button" onClick={handleToggle}>
                {hasUnread && <span className="message_indicator" />}
            </button>
            {isOpen && (
                <ChangeBox
                    changes={changes}
                    onClose={() => setIsOpen(false)}
                    onRead={handleMarkRead}
                />
            )}
        </>
    );
};

export default Bell;

type ChangeBoxProps = {
    changes: ChangeType[];
    onClose: () => void;
    onRead: (id: ChangeType["id"]) => void;
};

const ChangeBox: React.FC<ChangeBoxProps> = ({ changes, onClose, onRead }) => (
    <div className="Change_box" onMouseLeave={onClose}>
        <div className="Change_top">Changes</div>
        <div className="Change_context">
            {changes.length === 0 ? (
                <div className="No_changes">No changes</div>
            ) : (
                changes.map((item) => (
                    <ChangeMessageBox
                        item={item}
                        key={item.id}
                        onRead={onRead}
                    />
                ))
            )}
        </div>
    </div>
);

type ChangeItemProps = {
    item: ChangeType;
    onRead: (id: ChangeType["id"]) => void;
};

const ChangeMessageBox: React.FC<ChangeItemProps> = ({ item, onRead }) => (
    <div className="change_message_box" onClick={() => onRead(item.id)}>
        <div className="change_message">{item.message}</div>
        <div className="change_time">{item.createdAt}</div>
    </div>
);
