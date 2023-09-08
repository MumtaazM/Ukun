import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-3e080-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)
    clearInputField()

})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToList(currentItem)
        }
    }
    else{
        shoppingListEl.textContent = "No items here...yet"
    }
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML= ""
}

function clearInputField(){
    inputFieldEl.value = ""
}

function appendItemToList(item){
    let itemID = item [0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}






