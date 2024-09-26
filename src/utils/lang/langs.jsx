import RU from "../../assets/icons/ru.svg"
import UZ from "../../assets/icons/uz.svg"

export const languages = [
    {
        label: "Russian",
        key: "0",
        code: "ru",
        icon: <img src={RU} loading={"lazy"} alt={"russ"}/>,
    },
    {
        label: "O'zbek",
        key: "1",
        code: "uz",
        icon: <img src={UZ} loading={"lazy"} alt={"uz"}/>,
    },

];
