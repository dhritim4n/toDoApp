import { useState, useContext, useEffect } from "react";
import { toDoContext } from "../App";

export function EditToDoModal() {
  const { editToDoModal, setEditToDoModal } = useContext(toDoContext);
  const { selectedToDoItem, setSelectedToDoItem } = useContext(toDoContext);
  const { toDo, setToDo } = useContext(toDoContext);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (selectedToDoItem) {
      setTitle(selectedToDoItem.title);
      setStatus(selectedToDoItem.status);
    }
  }, [selectedToDoItem]);

  if (!editToDoModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="relative bg-slate-100 p-6 rounded-xl shadow-xl w-11/12 max-w-md mx-auto border border-slate-300">
        <ModalTitle />
        <CloseButton onClickFunction={closeEditToDoModal} />
        <textarea
          className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none min-h-[100px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditToDoItemStatus />
        <SaveButton />
      </div>
    </div>
  );

  function closeEditToDoModal() {
    setEditToDoModal(false);
  }

  function EditToDoItemStatus() {
    return (
      <div className="mt-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <option value="due">Due</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    );
  }

  function ModalTitle() {
    return (
      <div className="text-center font-bold text-xl text-sky-700 mb-4">
        Edit To-Do Item
      </div>
    );
  }

  function CloseButton({ onClickFunction }) {
    return (
      <div className="absolute top-2 right-2">
        <button
          onClick={onClickFunction}
          className="text-slate-600 hover:text-red-500 text-lg"
        >
          ✕
        </button>
      </div>
    );
  }

  function SaveButton() {
    return (
      <div className="mt-6 text-center">
        <button
          onClick={SaveButtonClick}
          className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition"
        >
          Save
        </button>
      </div>
    );
  }

  function SaveButtonClick() {
    if (title === "") return;

    const updatedItem = {
      ...selectedToDoItem,
      title: title,
      status: status,
    };

    const updatedList = toDo.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );

    setToDo(updatedList);
    setSelectedToDoItem(updatedItem);
    setEditToDoModal(false);
  }
}
