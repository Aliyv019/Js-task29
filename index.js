const input=document.querySelector('input')
const form=document.querySelector('form')
const list=document.querySelector('ul')

document.addEventListener('DOMContentLoaded',listreload)

API_URL='https://jsonplaceholder.typicode.com/todos'

async function listreload(){
    list.innerHTML=""
    try {const response=await fetch(API_URL)
        const data=await response.json()
        console.log(data);
        data.forEach((element)=>ToDosreload(element))
        } catch (error) {
            console.log(error);
        }
    
}

async function ToDosreload(element){
            const ListItem=document.createElement('li')
            ListItem.innerHTML=`
                <input type="checkbox" ${element.completed? "checked":""}>
                <span>${element.title}</span>
                <button>Edit</button>
                <button>Delete</button>`
            list.appendChild(ListItem)
            
            const deletebtn=ListItem.querySelectorAll('button')[1]
            deletebtn.addEventListener('click',()=>{deleteToDoitem(element,ListItem)})
            ListItem.querySelectorAll('button')[0].addEventListener('click',()=>{editToDoitem(element,ListItem)})
}

form.addEventListener('submit',addtodo)

async function addtodo(event){
    event.preventDefault()
    const title=input.value.trim()
    if(title){
        const newtodo={title,completed:false}
        try {
            const response=await fetch(API_URL,{
                method:'POST',
                body:JSON.stringify(newtodo),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            const todo=await response.json()
            input.value=""
            ToDosreload(todo)
        } catch (error) {
            console.log(error);
        }
    }
}
function deleteToDoitem(element,ListItem) {
    ListItem.remove()
    deleteToDo(element)
}

async function deleteToDo(element){
    try {
        const response=await fetch(`${API_URL}/${element.id}`,{
            method:"DELETE"
        })
        if(response.ok){
            console.log("Element deleted successfully");
        }
        else{
            console.log("Failed to delete element");
        }
    } catch (error) {
        console.log(error);
    }
}

function editToDoitem(element,ListItem){
    const editbtn=ListItem.querySelectorAll('button')[0]
    const span=ListItem.querySelector('span')
    const todonow=span.textContent
    if(editbtn.textContent=="Edit"){
        span.innerHTML=`<input type="text" value='${todonow}'>`
        ListItem.querySelectorAll('button')[0].textContent="Save"
    }
    else{
        const todonew=span.querySelector('input').value
        if(todonew){
            editToDo(element.id,todonew)
            span.textContent=todonew
            editbtn.textContent="Edit"
        }
    }
}



async function editToDo(element,titlenew){
    try {
        const response=await fetch(`${API_URL}/${element.id}`,{
            method:"PUT",
            body:JSON.stringify({title:titlenew}),
            headers:{
                'Content-type':'application/json;charset=UTF-8'
            }
        })
    } catch (error) {
        console.log(error);
    }
}


