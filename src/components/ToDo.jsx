import { useState, useEffect } from "react";
import { useContext } from "react";
import {toDoContext} from "../App";

export default function ToDo(){

    return(
        <div className="flex flex-col">
            <Title/>
            <AddToDoInput/>
            <StatusDropDown/>
            <ToDoGrid/>
        </div>
    )
}

function Title(){
    return(
    <div className="flex w-full bg-blue-400 h-20 items-center justify-center">
        <h1 className="text-red-500 bg-green-500 rounded text-3xl ">TO DO LIST </h1>

    </div>
    )
}


function AddToDoInput(){

    const {toDo,setToDo} = useContext(toDoContext);
    const [toDoListTitleInput, SetToDoListTitleInput] = useState("");

    const AddNewToDoItem = () => {

        if (!toDoListTitleInput.trim()) return;

        const newToDoItem = {
            "id":Object.keys(toDo).length+1,
            "status":"due",
            "title":toDoListTitleInput.trim()
        }
        setToDo([...toDo, newToDoItem]);
        SetToDoListTitleInput("")
    }

    return(
        <div className=" flex items-center justify-center bg-green-500 p-5">
        <input type="text" placeholder="Add New To-Do" value={toDoListTitleInput}  onChange={(e) => SetToDoListTitleInput(e.target.value)} className="rounded px-6 py-1"/>
        <button className="bg-blue-500 rounded m-2 px-6 py-1" onClick={AddNewToDoItem}>Add</button>
        </div>
    );

}

function StatusDropDown(){

    const {toDoDropDown, setToDoDropDown} = useContext(toDoContext);

    return(
        <div className=" flex items-center justify-center bg-green-500 p-5">
            <select value={toDoDropDown} onChange={(e)=>setToDoDropDown(e.target.value)}>
            <option value="all">All</option>
            <option value="due">Due</option>
            <option value="completed">Completed</option>
            </select>

        </div>
    )
}

function ToDoGrid(){
    const {toDo, setToDo}= useContext(toDoContext);
    const {toDoDropDown, SetToDoDropDown} = useContext(toDoContext);
    const toDos = [
        {
            "id":1,
            "status":"due",
            "title":"4th task"
        },
        {
            "id":2,
            "status":"completed",
            "title":"4th task"
        },
        {
            "id":3,
            "status":"due",
            "title":"4th task"
        }
    ]


    useEffect( ()=>{
        setToDo(toDos)
    },[])

    useEffect(()=>{
        console.log(toDo?.[0]?.['title']);
    },[toDo])

    return(
        <div className="flex flex-col bg-green-500 gap-2 items-center justify-center p-5">
           
           {toDo.map((item)=>{

            if(toDoDropDown=="all"){
                return(
                    <ToDoItem
                    item = {item}
                    />
                )
            }
                return(
                item['status']==toDoDropDown &&
                <ToDoItem
                item = {item}
                />
            );
           })}

        </div>
    )
}

function ToDoItem({ item }) {
    const {toDo, setToDo} = useContext(toDoContext); 
  

    return (
      <div
        draggable="true"
        className="container max-w-md mx-auto p-1 flex flex-row gap-5 items-center justify-between bg-red-500 rounded"
      >
        <p>{item?.id}</p>
        <p>{item?.title}</p>
        <p className="ml-10">{item?.status}</p>
        <button>Edit</button>
        <button onClick={() => deleteButtonClick(item)}>Delete</button>
      </div>
    );


    function deleteButtonClick(item) {
        const newToDo = toDo.filter(todoItem => todoItem.id !== item.id);
        setToDo(newToDo);
      }
    

  }



