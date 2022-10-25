import { callLoginStorage } from "../../scripts/localStorage.js"

function checkAccount (){
    if (callLoginStorage()){
        window.location.assign("/pages/home/home.html", "_self")
    }
}

checkAccount ()