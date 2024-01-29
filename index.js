

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push ,onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting= {
    databaseURL:"https://university-tracker-phd-default-rtdb.firebaseio.com/" 
}

const app=initializeApp(appSetting)
const database=getDatabase(app)
const shoppingLIstDB=ref(database,"shoppingList")

const input_el=document.getElementById("input-el")
//const input_link=document.getElementById("input-link")
const add_btn=document.getElementById("add-button")
const shopingListEL=document.getElementById("shopingList")

add_btn.addEventListener("click", function(){
let input_value=input_el.value;
//let input_link_value= input_link.value;

push(shoppingLIstDB,input_value)
//push(shoppingLIstDB,input_link_value)



clearInputFieldEl()


})

onValue(shoppingLIstDB,function(snapshot){

    if(snapshot.exists()){

    let itemArray=Object.entries(snapshot.val())

    clearShoppingLIstItem()
    
    for(let i=0;i<itemArray.length;i++){
        let currItem=itemArray[i]
       

        let currentItemID=currItem[0]
        let currentItemValue=currItem[1]
        appendItemToShoppingListEl(currItem)
    }
}
     else {
        shopingListEL.innerHTML=" No Items Here Yet"
     }
    
    }
    
) 

function clearInputFieldEl() {
    input_el.value=" "

}

function clearShoppingLIstItem() {
    shopingListEL.innerHTML=" "
}

function appendItemToShoppingListEl(item) {
    //shopingListEL.innerHTML += `<li>${itemValue}</li>`

    let itemID=item[0]
    let itemValue=item[1]

    let newElement=document.createElement("li")

    newElement.textContent= itemValue

    newElement.addEventListener("click",function(){
        let itemLocationInDB=ref(database,`shoppingList/${itemID}`)
        remove(itemLocationInDB)
    })

    shopingListEL.appendChild(newElement)


}


