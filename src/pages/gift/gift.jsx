import React, { useEffect, useState } from 'react';
import './gift.css';
import { useTranslation } from 'react-i18next';

import naushnik from '../../assets/gift/naushnik.png';
import airpods from '../../assets/gift/airpods.png';
import futbolka from '../../assets/gift/futbolka.png';
import koptok from '../../assets/gift/koptok.png';
import velosiped from '../../assets/gift/velosiped.png';

const Gift = () => {
    const { t } = useTranslation();

    const items = [ naushnik, airpods, futbolka, koptok, velosiped];
    const [positions, setPositions] = useState(
        items.map(() => ({
            top: Math.random() * window.innerHeight,
            left: Math.random() * window.innerWidth,
            xDirection: Math.random() < 0.5 ? 1 : -1,
            yDirection: Math.random() < 0.5 ? 1 : -1,
        }))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setPositions((prevPositions) =>
                prevPositions.map((pos) => {
                    let newTop = pos.top + pos.yDirection * 2;
                    let newLeft = pos.left + pos.xDirection * 2;

                    // Change direction if hitting the edges
                    if (newTop < 0 || newTop > window.innerHeight - 30) {
                        pos.yDirection *= -1;
                        newTop = pos.top + pos.yDirection * 2; // Update position after direction change
                    }

                    if (newLeft < 0 || newLeft > window.innerWidth - 30) {
                        pos.xDirection *= -1;
                        newLeft = pos.left + pos.xDirection * 2; // Update position after direction change
                    }

                    return {
                        ...pos,
                        top: newTop,
                        left: newLeft,
                        xDirection: pos.xDirection,
                        yDirection: pos.yDirection,
                    };
                }))
        }, 50); // Update every 50ms for smooth animation

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gift">
            {positions.map((pos, index) => (
                <img
                    key={index}
                    src={items[index]}
                    alt=""
                    className="gift_item"
                    style={{
                        position: 'absolute',
                        top: `${pos.top}px`,
                        left: `${pos.left}px`,
                    }}
                />
            ))}
            <h1>{t("gift.h1")}</h1>
        </div>
    );
};

export default Gift;
