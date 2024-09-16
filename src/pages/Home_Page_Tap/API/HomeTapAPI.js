import axios from "axios";


export const GetUserAPI = async ()=>{
    try {
        const res = await axios.get("http://84.247.160.205/")
    }catch (e){
        console.log(e)
    }
}