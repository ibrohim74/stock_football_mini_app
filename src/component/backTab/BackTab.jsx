import React from 'react';
import "./BackTab.css"
import {LeftOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import back from "../../assets/icon/back.webp"
const BackTab = ({back_url ,style } ) => {
    return (
        <Link style={style} className={"back-tab"} to={back_url} >
               <LeftOutlined/>

        </Link>
    );
};

export default BackTab;