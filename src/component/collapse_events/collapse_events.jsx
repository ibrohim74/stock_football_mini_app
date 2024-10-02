import React, { useEffect, useRef, useState } from 'react';
import './collapse_event.css';

const CollapseItem = ({ label, children, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setMaxHeight(contentRef.current.scrollHeight);
        } else {
            setMaxHeight(0);
        }
    }, [isOpen]);

    return (
        <div className={`collapse-item-event ${isOpen ? 'open' : ''}`}>
            <div
                className={`collapse-header-event ${isOpen ? 'active' : ''}`} // Add 'active' class when open
                onClick={onClick}
            >
                {label}
            </div>
            <div
                className="collapse-content-event"
                ref={contentRef}
                style={{ maxHeight: `${maxHeight}px` }}
            >
                {children}
            </div>
        </div>
    );
};

const CollapseEvents = ({ items }) => {
    const [openKey, setOpenKey] = useState(null);

    const handleToggle = (key) => {
        setOpenKey(openKey === key ? null : key);
    };

    return (
        <div className="collapse-container-event">
            {items.map((item) => (
                <CollapseItem
                    key={item.key}
                    label={item.label}
                    isOpen={openKey === item.key}
                    onClick={() => handleToggle(item.key)}
                >
                    {item.children}
                </CollapseItem>
            ))}
        </div>
    );
};

export default CollapseEvents;
