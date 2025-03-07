const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton= document.getElementById("deleteAll");
const filterbuttons = document.querySelectorAll(".filter-todos");

 let todos = JSON.parse(localStorage.getItem ("todos")) || [];
//because we will change the amount of todos later == let
const generateId = () =>{
    return Math.round(
        Math.random()*Math.random()*Math.pow(10 , 15)
    ).toString();
}

const showAlert = (message , type) =>{
    alertMessage.innerHTML = "";   //for removing the previous ones 
    const alert = document.createElement("p");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);

    setTimeout(() =>{
        alert.style.display = "none";
    }, 2000)
}

const displayTodos = (data) => {
    const todolist = data || todos;
    //for preventing the repition in printing the previos valus in arry we make it empty first
    todosBody.innerHTML="";
    //ma do ta halat dorim ya arayeh aval khalier ya nis pas bayad do ta halato dar nazar geref
   if (!todolist.length){
    todosBody.innerHTML = "<tr><td colspan='4'> no task found </td></tr>";
    return;
   }
   todolist.forEach(todo => {
    //yeki yeki be araye todos add kon    braye vaghti ke mikhaym meghdar truthy neshon dade beshe as || estefade mikonim mesl paeiin
    //for keeping the previous ones we should add them to each other with + if wwe dont do that we only can seee the last one

    todosBody.innerHTML+= `
    <tr>
          <td>${todo.task}</td>
          <td>${todo.date || "no date"}</td> 
          <td>${todo.completed ?"compeleted": "pending"}</td>
          <td>
          <button onclick="editHandler('${todo.id}')">Edit</button>
          <button onclick="toggleHandler('${todo.id}')" >${todo.completed?"Undo":"Do"}</button>
          <button onclick="DeleteHandler('${todo.id}')">Delete</button>
          </td>
     </tr>     
    `

   });
}



const saveToLocalStorage = () =>{
 localStorage.setItem("todos" ,JSON.stringify(todos));
}

const addHandler = () =>{
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        id:generateId(),
        completed: false,
        task,
        date,     //because the name of key and value are the same
        
    };
    if(task) {
        todos.push(todo);
        saveToLocalStorage();
        taskInput.value="";
        dateInput.value="";
        console.log(todos);  
        showAlert("Todo added successfully" , "success");
    }
    else{
        showAlert("Please enter a todo!" , "error");
    }
};
const deleteAllHandler =() =>{
    // yek shart mizarim agar toso khali bod bad click chi bege
    if(todos.length){
    todos=[];
    saveToLocalStorage () ;
    displayTodos();
    showAlert("All todos cleared successfully" , "success")}
    else{
        showAlert("No todos to clear","error");
    }
}
const DeleteHandler=(id) =>{
const newtodos= todos.filter((todo) => todo.id !== id)
todos=newtodos;
saveToLocalStorage();
displayTodos();
showAlert("todo deleted successfully" , "success");

}
const toggleHandler= (id) => {
    /*const newtodos = todos.map((todo) => {
        if(todo.id === id){
            return {
                //instesd of writing all values again use spread oprater and rewrite the value want to change
                ...todo,
                completed: !todo.completed,
            }}
         else {
                return todo;
            }
        
    });
   todos=newtodos;*/
    //instead of the codes above we can use this  it relates to the referesive type 
    const todo=todos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    saveToLocalStorage();
    displayTodos();
    showAlert("todo status changed successfully","success ")

}

const editHandler=(id) => {
    const todo = todos.find((todo) => todo.id === id);
    taskInput.value= todo.task;
    dateInput.value= todo.date;
    addButton.style.display = "none";
    editButton.style.display= "inline-block"
    editButton.dataset.id = id;
    //for recognizing which action clicked on
}

const applyeditHandler = (event) => {
    const id = event.target.dataset.id;
    const todo = todos.find(todo => todo.id === id);
    todo.task = taskInput.value;
    todo.date = dateInput.value;
    taskInput.value = "";
    dateInput.value = "";
    addButton.style.display = "inline-block";
    editButton.style.display = "none";
    saveToLocalStorage();
    displayTodos();
    showAlert("todo edited successfully","success")   

}
const filterHandler = (event) => {
    
    let filtertodos= null; // nul has less amount compared to undefind
    const filter= event.target.dataset.filter; //dataseti ke toye html dadim ro begir
    switch(filter){
        case "pending":
            filtertodos = todos.filter((todo) => todo.completed === false)
            break;
        case "completed":
                filtertodos = todos.filter((todo) => todo.completed === true)
                break;   
        default:
            filtertodos = todos;
            break;
    }
 displayTodos(filtertodos);
}

 window.addEventListener("load" , () => displayTodos());//  ew defind it like a function here because we dont want to behave with it like an event....whenever the web loaded show this functon
 addButton.addEventListener("click" , addHandler);
 deleteAllButton.addEventListener("click" , deleteAllHandler );
 editButton.addEventListener("click" , applyeditHandler)

 filterbuttons.forEach((button) =>{
    button.addEventListener("click" , filterHandler);
 });