import { useState, useEffect, useContext } from "react";
import { toDoContext } from "../App";
import { EditToDoModal } from "./EditToDoModal";

export default function ToDo() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-yellow-200 via-orange-300 to-pink-200 text-black px-4 py-6">
      <Title />
      <AddToDoInput />
      <StatusFilterDropDown />
      <ProgressBar />
      <DeleteCompletedToDosButton />
      <EditToDoModal />
      <ToDoGrid />
    </div>
  );
}

function Title() {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-4 mb-6 shadow-md rounded">
      <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-white tracking-wide animate-pulse">
        📝 TO DO LIST
      </h1>
    </div>
  );
}

function ProgressBar() {
  const { toDo } = useContext(toDoContext);
  let progress = countProgress(toDo, "completed");

  if (Number.isNaN(progress)) {
    return null;
  }

  return (
    <div className="bg-indigo-600 text-white font-semibold px-6 py-6 mb-6 rounded-xl shadow-xl text-center w-full max-w-lg">
      TASK COMPLETION: {Math.floor(progress)}%
      <div className="w-full mt-3 h-4 bg-white rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {progress === 100 && (
        <p className="mt-2 text-green-200 font-bold text-sm animate-bounce">
          🎉 All Tasks Completed!
        </p>
      )}
    </div>
  );
}

function countProgress(toDo, keyword) {
  let count = 0;
  for (let item of toDo) {
    if (item.status === keyword) {
      count += 1;
    }
  }
  return Math.floor((count / toDo.length) * 100);
}

function AddToDoInput() {
  const { toDo, setToDo } = useContext(toDoContext);
  const [toDoListTitleInput, SetToDoListTitleInput] = useState("");

  const AddNewToDoItem = () => {
    if (!toDoListTitleInput.trim()) return;
    
    const newToDoItem = {
      id: toDo.length === 0 ? 1 : toDo[toDo.length - 1].id + 1,
      status: "due",
      title: toDoListTitleInput.trim()
    };

    setToDo([...toDo, newToDoItem]);
    SetToDoListTitleInput("");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/70 backdrop-blur-md p-4 rounded-xl w-full max-w-lg mb-4 shadow-md">
      <input
        type="text"
        placeholder="Add New To-Do"
        value={toDoListTitleInput}
        onChange={(e) => SetToDoListTitleInput(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
        onClick={AddNewToDoItem}
      >
        ➕ Add
      </button>
    </div>
  );
}

function StatusFilterDropDown() {
  const { toDoDropDown, setToDoDropDown } = useContext(toDoContext);

  return (
    <div className="flex items-center justify-center bg-white/70 backdrop-blur-md p-4 rounded-xl w-full max-w-lg mb-4 shadow-md">
      <select
        value={toDoDropDown}
        onChange={(e) => setToDoDropDown(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
      className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:scale-105 hover:shadow-lg transition-transform duration-300 text-sm mb-6"
    >
      🗑️ Delete Completed Tasks
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

  if (!toDo.length) {
    return (
      <div className="text-center mt-4">
        <div className="text-4xl mb-4 animate-bounce">📝</div>
        <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          No Tasks Found
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          Add a New Task to get started !!
        </p>
      </div>
    );
  }
  

  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
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
    <div className="bg-white text-black px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl border-l-8 border-indigo-400 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-md text-sm">
      <div className="flex gap-4 flex-wrap items-center">
        <input
          type="checkbox"
          className="cursor-pointer accent-indigo-600 scale-125"
          checked={item.status === "completed"}
          onChange={() => toggleToDoItemStatus(item)}
        />
        <p className="font-bold">#{item?.id}</p>
        <p
          className={`${
            item.status === "completed"
              ? "line-through text-gray-400"
              : "text-black"
          } font-medium`}
        >
          {item?.title}
        </p>
        <p
        className={`italic text-xs text-white px-2 py-1 rounded 
          ${item.status === "due" ? "bg-red-500" : "bg-green-500"}`}
        >
        {item?.status}
      </p>
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => editButtonClick(item)}
          className="bg-gradient-to-tr from-white to-indigo-100 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-200 shadow-sm transition-all duration-200 hover:scale-105"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => deleteButtonClick(item)}
          className="bg-gradient-to-tr from-white to-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 shadow-sm transition-all duration-200 hover:scale-105"
        >
          ❌ Delete
        </button>
      </div>
    </div>
  );
}
