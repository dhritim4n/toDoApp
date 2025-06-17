
import ToDo from './components/ToDo'
import { useState } from 'react';
import { createContext } from 'react'

export const toDoContext = createContext();

function App() {
  

  const [toDo, setToDo] = useState([]);
  const [toDoDropDown, setToDoDropDown] = useState("all");
  const [editToDoModal, setEditToDoModal] = useState(false);
  const [selectedToDoItem, setSelectedToDoItem] = useState({});

  const contextValue = {
    toDo, setToDo, toDoDropDown, setToDoDropDown, editToDoModal, setEditToDoModal, selectedToDoItem, setSelectedToDoItem
}

  return (
    <div>
      <toDoContext.Provider value={contextValue}>
      <ToDo/>
      </toDoContext.Provider>
    </div>
  )
}

export default App
