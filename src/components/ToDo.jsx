import { useState, useEffect, useContext } from "react";
import { toDoContext } from "../App";
import { EditToDoModal } from "./EditToDoModal";

export default function ToDo() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-orange-300 text-black px-4 py-6">
      <Title />
      <AddToDoInput />
      <StatusFilterDropDown />
      <DeleteCompletedToDosButton />
      <EditToDoModal />
      <ToDoGrid />
    </div>
  );
}

function Title() {
  return (
    <div className="w-full bg-indigo-600 py-4 mb-6">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">TO DO LIST</h1>
    </div>
  );
}

function AddToDoInput() {
  const { toDo, setToDo } = useContext(toDoContext);
  const [toDoListTitleInput, SetToDoListTitleInput] = useState("");

  const AddNewToDoItem = () => {
    if (!toDoListTitleInput.trim()) return;
    const newToDoItem = {
      id: Object.keys(toDo).length + 1,
      status: "due",
      title: toDoListTitleInput.trim()
    };
    setToDo([...toDo, newToDoItem]);
    SetToDoListTitleInput("");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-cyan-100 p-4 rounded w-full max-w-lg mb-4">
      <input
        type="text"
        placeholder="Add New To-Do"
        value={toDoListTitleInput}
        onChange={(e) => SetToDoListTitleInput(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
      />
      <button
        className="w-full sm:w-auto bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 text-sm"
        onClick={AddNewToDoItem}
      >
        Add
      </button>
    </div>
  );
}

function StatusFilterDropDown() {
  const { toDoDropDown, setToDoDropDown } = useContext(toDoContext);

  return (
    <div className="flex items-center justify-center bg-cyan-100 p-4 rounded w-full max-w-lg mb-4">
      <select
        value={toDoDropDown}
        onChange={(e) => setToDoDropDown(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
      >
        <option value="all">All</option>
        <option value="due">Due</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

function DeleteCompletedToDosButton() {
  const { toDo, setToDo } = useContext(toDoContext);

  function DeleteCompletedToDos() {
    const updatedList = toDo.filter((item) => item.status !== "completed");
    setToDo(updatedList);
  }

  return (
    <button
      onClick={DeleteCompletedToDos}
      className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 text-sm mb-4"
    >
      Delete Completed To Dos
    </button>
  );
}

function ToDoGrid() {
  const { toDo, setToDo } = useContext(toDoContext);
  const { toDoDropDown } = useContext(toDoContext);

  const toDos = [
    { id: 1, status: "due", title: "1st task" },
    { id: 2, status: "completed", title: "2nd task" },
    { id: 3, status: "due", title: "3rd task" }
  ];

  useEffect(() => {
    setToDo(toDos);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      {toDo.map((item) => {
        if (toDoDropDown === "all" || item.status === toDoDropDown) {
          return <ToDoItem key={item.id} item={item} />;
        }
        return null;
      })}
    </div>
  );
}

function ToDoItem({ item }) {
  const { toDo, setToDo } = useContext(toDoContext);
  const { setEditToDoModal } = useContext(toDoContext);
  const { setSelectedToDoItem } = useContext(toDoContext);

  function deleteButtonClick(item) {
    const newToDo = toDo.filter((todoItem) => todoItem.id !== item.id);
    setToDo(newToDo);
  }

  function editButtonClick(item) {
    setSelectedToDoItem(item);
    setEditToDoModal(true);
  }

  function toggleToDoItemStatus(item) {
    const updatedToDos = toDo.map((i) =>
      i.id === item.id
        ? { ...i, status: i.status === "due" ? "completed" : "due" }
        : i
    );
    setToDo(updatedToDos);
  }

  return (
    <div className="bg-rose-400 text-white px-4 py-3 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between shadow text-sm">
      <div className="flex gap-4 flex-wrap">
        <input type="checkbox" checked={item.status === "completed"} onChange = {() => toggleToDoItemStatus(item)} />
        <p className="font-bold">#{item?.id}</p>
        <p className={item.status === "completed" ? "line-through" : ""}>{item?.title}</p>
        <p className="italic">{item?.status}</p>
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => editButtonClick(item)}
          className="bg-white text-rose-600 px-3 py-1 rounded hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => deleteButtonClick(item)}
          className="bg-white text-rose-600 px-3 py-1 rounded hover:bg-gray-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
