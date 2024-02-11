import "./App.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./page/TaskModal";
import ReactPaginate from "react-paginate";

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

  const tasksPerPage = 3;
  const pagesVisited = currentPage * tasksPerPage;

  const pageCount = Math.ceil(tasks.length / tasksPerPage);

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
      const response = await axios.get("http://localhost:8000/tasks");

      const sortedTasks = sortByTitle
        ? response.data.slice().sort((a, b) => a.task.localeCompare(b.task))
        : response.data;

      setTask(sortedTasks);
    };
    fetchData();
  }, [updateTask, sortByTitle]);

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
        <h1>Task</h1>
        <div className="box">

          <form onSubmit={addTask}>
            <input type="text" placeholder="Dodaj task" value={note} onChange={(e) => setNote(e.target.value)} />
            <textarea placeholder="Dodaj detaljan opis" value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="bg-primary" type="submit">
              Dodaj task
            </button>
          </form>
        </div>
        <div className="box">
        <button onClick={sortByTitleHandler}>Sortiraj po nazivu</button>
          <ul>
            {tasks.slice(pagesVisited, pagesVisited + tasksPerPage).map((task, index) => (
              <li className="task_list" key={index}>
                <h3>
                  <span className="text-primary">Title: </span>
                  {task.task}
                </h3>
                <p>
                  <span className="text-primary">Contect: </span>
                  {task.sadrzaj}
                </p>
                <div className="button_mood">
                  <button className="bg-primary" onClick={() => editTask(task.id)}>
                    Izmijeni
                  </button>
                  <button className="bg-danger" onClick={() => deleteTask(task.id)}>
                    Izbriši
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
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
