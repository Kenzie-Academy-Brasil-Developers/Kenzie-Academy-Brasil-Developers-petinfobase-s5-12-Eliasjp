import { callLoginStorage } from "../../scripts/localStorage.js"

function checkLogin (){
    if (!callLoginStorage ()){
        window.location.assign("../../index.html", "_self")
    }
}

checkLogin ()