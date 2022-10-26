import { callLoginStorage } from "../../scripts/localStorage.js"

function checkAccount (){
    if (callLoginStorage()){
        window.location.assign("../../home.html", "_self")
    }
}

checkAccount ()