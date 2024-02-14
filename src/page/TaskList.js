import React from "react";
import ReactPaginate from "react-paginate";

function TaskList({ tasks, pageCount, changePage, editTask, sortByTitleHandler, sortByDateHandler, deleteTask }) {
  return (
    <div className="box">
      <button onClick={sortByTitleHandler}>Sortiraj po nazivu</button>
      <button onClick={sortByDateHandler}>Sortiraj po datumu</button>
      <ul>
        {tasks.map((task, index) => (
          <li className="task_list" key={index}>
            <h3>
              <span className="text-primary">Title: </span>
              {task.task}
            </h3>
            <p>
              <span className="text-primary">Contect: </span>
              {task.sadrzaj}
            </p>
            <p>
              <span className="text-primary">Datum: </span>
              {task.datum}
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
  );
}

export default TaskList;
