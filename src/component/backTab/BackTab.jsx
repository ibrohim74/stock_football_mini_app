import React from 'react';
import "./BackTab.css"
import {LeftOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import back from "../../assets/icon/back.png"
const BackTab = ({back_url}) => {
    return (
        <div className={"back-tab"}>
            <Link to={back_url}>
               <img src={back} loading={"lazy"} alt={"sad"} width={50} height={50}/>
            </Link>
        </div>
    );
};

export default BackTab;