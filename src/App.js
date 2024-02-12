import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./page/TaskModal";
import TaskForm from "./page/TaskForm";
import TaskList from "./page/TaskList";

function App() {
  const [tasks, setTask] = useState([]);
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");

  const [edit, setEdit] = useState();

  const [editNaslov, setEditNaslov] = useState("");
  const [editSadrzaj, setEditSadrzaj] = useState("");
  const [editedIndex, setEditedIndex] = useState(null);

  const [naslovTaska, setNaslovTaska] = useState("");
  const [sadrzajTaska, setSadrzajTaska] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState();

  const [currentPage, setCurrentPage] = useState(0);

  const [updateTask, setUpdateTask] = useState();

  const [sortByTitle, setSortByTitle] = useState(false);

  const [pageCount, setPageCount] = useState();

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlerModalOpen = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/tasks", {
        params: {
          _page: currentPage + 1,
          _per_page: 3,
        },
      });
      const pageCount = Math.ceil(response.data.pages);
      setPageCount(pageCount);

      const tasksData = response.data.data || response.data;

      const sortedTasks = sortByTitle ? tasksData.slice().sort((a, b) => a.task.localeCompare(b.task)) : tasksData;

      setTask(sortedTasks);

      console.log(sortedTasks)
    };

    fetchData();
  }, [updateTask, sortByTitle, currentPage]);

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/tasks", { task: note, sadrzaj: content });
    setNote("");
    setContent("");
    setUpdateTask(!updateTask);
  };

  const deleteTask = async (index) => {
    setEdit(false);
    handlerModalOpen();
    const taskToDelete = tasks.find((task) => task.id === index); // ovo je postavljeno samo kako bi se izvukao naziv i sadrzaj od taska
    // u tasks listi trazi da se poklopi task.id i sa task.id koji je pozvao funkciju
    setNaslovTaska(taskToDelete.task);
    setSadrzajTaska(taskToDelete.sadrzaj);
    setDeleteFunction(() => {
      const deleteFromDatabase = async () => {
        await axios.delete(`http://localhost:8000/tasks/${index}`);
        handleCloseModal();
      };
      return deleteFromDatabase;
    });
    setUpdateTask(!updateTask);
  };

  const editTask = async (index) => {
    const taskToEdit = tasks.find((task) => task.id === index);
    setEditedIndex(index); // posto je edit save izvan fukncije ovo sluzi da sacuva taj pravi id
    setEdit(true);
    setEditNaslov(taskToEdit.task);
    setEditSadrzaj(taskToEdit.sadrzaj);
    handlerModalOpen();
  };

  const editSave = async () => {
    await axios.put(`http://localhost:8000/tasks/${editedIndex}`, { task: editNaslov, sadrzaj: editSadrzaj });
    handleCloseModal();
    setEdit(false);
    setUpdateTask(!updateTask);
  };

  const sortByTitleHandler = () => {
    setSortByTitle(!sortByTitle);
  };

  return (
    <>
      <div className="container">
        <TaskForm note={note} content={content} setNote={setNote} setContent={setContent} addTask={addTask} />
        <TaskList
          tasks={tasks}
          pageCount={pageCount}
          changePage={changePage}
          edit={edit}
          sadrzajTaska={sadrzajTaska}
          naslovTaska={naslovTaska}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          deleteFunction={deleteFunction}
          editTask={editTask}
          editSave={editSave}
          sortByTitleHandler={sortByTitleHandler}
          deleteTask={deleteTask}
        />
      </div>
      <Modal
        edit={edit}
        sadrzaj={sadrzajTaska}
        naslov={naslovTaska}
        show={showModal}
        handleClose={handleCloseModal}
        indexFunction={edit ? editSave : deleteFunction}
        editNaslov={editNaslov}
        editSadrzaj={editSadrzaj}
        seteditNaslov={setEditNaslov}
        seteditSadrzaj={setEditSadrzaj}
      />
    </>
  );
}

export default App;
