import React, { useEffect, useRef, useState } from "react";
import './collapse.css'; // Collapse uchun CSS

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
        <div className={`collapse-item ${isOpen ? 'open' : ''}`}>
            <div className="collapse-header" onClick={onClick}>
                {label}
                <span className="collapse-icon">{isOpen ? '-' : '+'}</span>
            </div>
            <div
                className="collapse-content"
                ref={contentRef}
                style={{ maxHeight: `${maxHeight}px` }}
            >
                {children}
            </div>
        </div>
    );
};

export const Collapse_Stock = ({ items }) => {
    const [openKey, setOpenKey] = useState(null);

    const handleToggle = (key) => {
        setOpenKey(openKey === key ? null : key);
    };

    return (
        <div className="collapse-container">
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
