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
      <div className="relative bg-white p-6 rounded-2xl shadow-2xl w-11/12 max-w-md mx-auto border border-gray-200 transform transition-all duration-300 scale-95 animate-[fade-in-up_0.3s_ease-out]">
        <ModalTitle />
        <CloseButton onClickFunction={closeEditToDoModal} />
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none min-h-[100px] bg-white shadow-inner"
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
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-inner"
        >
          <option value="due">Due</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    );
  }

  function ModalTitle() {
    return (
      <div className="text-center font-bold text-2xl text-sky-700 mb-4">
        ✏️ Edit To-Do Item
      </div>
    );
  }

  function CloseButton({ onClickFunction }) {
    return (
      <div className="absolute top-2 right-2">
        <button
          onClick={onClickFunction}
          className="text-gray-500 hover:text-red-500 text-xl transition-transform duration-200 hover:scale-125"
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
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-transform duration-200 hover:scale-105 shadow-md"
        >
          💾 Save
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
