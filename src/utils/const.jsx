import Peredacha from "../pages/Peredacha_Page/peredacha.jsx";
import HomePage from "../pages/Home_Page/homePage.jsx";
import League from "../pages/League_Page/league.jsx";
import Friends from "../pages/Friends_Page/friends.jsx";
import Gift from "../pages/Gift_Page/gift.jsx";
import Settings from "../pages/Settings_Page/settings.jsx";

export const HOME_PAGE = "/"
export const PEREDACHA = "/peredacha"
export const LEAGUE = "/League"
export const FRIENDS = "/friends"
export const GIFT = "/gift"
export const SETTINGS = "/setting"

export const RouterData = [
    {
        Path:HOME_PAGE,
        Component:<HomePage/>
    },
    {
        Path:PEREDACHA,
        Component:<Peredacha/>
    },
    {
        Path:LEAGUE,
        Component:<League/>
    },
    {
        Path:FRIENDS,
        Component:<Friends/>
    },
    {
        Path:GIFT,
        Component:<Gift/>
    },
    {
        Path:SETTINGS,
        Component:<Settings/>
    },
]