import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./TaskModal";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Task() {
  const [tasks, setTask] = useState([]);

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

  const [sortByTitle, setSortByTitle] = useState();

  const [sortByDate, setSortByDate] = useState();

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
      const sorted =
        (sortByDate && (sortByDate === "asc" ? "datum" : "-datum")) ||
        (sortByTitle ? (sortByTitle === "asc" ? "task" : "-task") : "task");

      const response = await axios.get("http://localhost:8000/tasks", {
        params: {
          _page: currentPage + 1,
          _per_page: 3,
          _sort: sorted,
        },
      });

      let tasksData = response.data.data || response.data;

      setTask(tasksData);

      const pageCount = Math.ceil(response.data.pages);
      setPageCount(pageCount);
    };

    fetchData();
  }, [updateTask, sortByTitle, sortByDate, currentPage]);

  const deleteTask = async (index) => {
    setEdit(false);
    handlerModalOpen();
    if (!Array.isArray(index)) {
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
    } else if (Array.isArray(index) && index.length > 1) {
      const tasksToDelete = tasks.filter((task) => index.includes(task.id));
      setNaslovTaska(`Brisanje ${tasksToDelete.length} stavki`);
      setSadrzajTaska(`Da li ste sigurni da želite da obrišete ${tasksToDelete.length} stavki?`);
      setDeleteFunction(() => async () => {
        for (const taskToDelete of tasksToDelete) {
          await axios.delete(`http://localhost:8000/tasks/${taskToDelete.id}`);
        }
        handleCloseModal();
      });
    }

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
    setSortByDate(false); // Isključuje sortiranje po datumu
  };

  const sortByDateHandler = () => {
    setSortByDate(!sortByDate);
    setSortByTitle(false); // Isključuje sortiranje po naslovu
  };

  return (
    <>
      <div className="container">
        <TaskForm
          updateTask={updateTask}
          setUpdateTask={setUpdateTask}
        />
        <TaskList
          tasks={tasks}
          pageCount={pageCount}
          changePage={changePage}
          edit={edit}
          sadrzajTaska={sadrzajTaska}
          naslovTaska={naslovTaska}
          handleCloseModal={handleCloseModal}
          editTask={editTask}
          editSave={editSave}
          sortByTitleHandler={sortByTitleHandler}
          sortByDateHandler={sortByDateHandler}
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

export default Task;
