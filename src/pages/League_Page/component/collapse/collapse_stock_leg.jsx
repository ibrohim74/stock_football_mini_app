import React, { useState } from "react";
import './collapseLeg.css'; // Collapse uchun CSS

const CollapseItem = ({ label, children, isOpen, onClick }) => {
    return (
        <div className={`collapse-item-l ${isOpen ? 'open' : ''}`}>
            <div className="collapse-header-l" onClick={onClick}>
                {label}
                <span className="collapse-icon-l">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="collapse-content-l">
                    {children}
                </div>
            )}
        </div>
    );
};

export const Collapse_stock_leg = ({ items , setOpenKeyItem}) => {
    const [openKey, setOpenKey] = useState(null);

    const handleToggle = (key) => {
        setOpenKey(openKey === key ? null : key);
        setOpenKeyItem(openKey === key ? null : key)
    };

    return (
        <div className="collapse-container-l">
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
