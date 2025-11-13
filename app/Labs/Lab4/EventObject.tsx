import React, { useState } from "react";

type ClickEventData = {
    type: string;
    target: string;
};

export default function EventObject() {
    const [event, setEvent] = useState<ClickEventData | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const targetHtml = (e.target as HTMLElement).outerHTML;
        setEvent({
            type: e.type,
            target: targetHtml,
        });
    };

    return (
        <div>
            <h2>Event Object</h2>
            <button
                onClick={handleClick}
                className="btn btn-primary"
                id="wd-display-event-obj-click"
            >
                Display Event Object
            </button>
            <pre>{JSON.stringify(event, null, 2)}</pre>
            <hr />
        </div>
    );
}


