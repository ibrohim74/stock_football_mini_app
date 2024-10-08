import React, { useEffect, useState } from 'react';
import './gift.css';
import { useTranslation } from 'react-i18next';

import naushnik from '../../assets/gift/naushnik.png';
import airpods from '../../assets/gift/airpods.png';
import futbolka from '../../assets/gift/futbolka.png';
import koptok from '../../assets/gift/koptok.png';
import velosiped from '../../assets/gift/velosiped.png';
import iphone from '../../assets/gift/iphone.png';
import powerbank from '../../assets/gift/powebank.png';
import televizor from '../../assets/gift/televizor.png';
import ps5 from '../../assets/gift/ps5.png';
import samakat from '../../assets/gift/samakat.png';
import sigway from '../../assets/gift/sigway.png';

const Gift = () => {
    const { t } = useTranslation();
    const items = [ naushnik, airpods, futbolka, koptok, velosiped, iphone, powerbank , televizor, ps5 , samakat, sigway];


    return (
        <div className="gift">
            <div className="gift_box">
                {items.map((item, index) => (
                    <div className="gift_item" key={index}>
                        <span className="gift_blur"><h1>{t("gift.h1")}</h1></span>
                        <img src={item} alt=""/>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Gift;
