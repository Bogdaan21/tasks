import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function TaskList({ tasks, pageCount, changePage, editTask, sortByTitleHandler, sortByDateHandler, deleteTask }) {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectTask = (taskId) => {
    const isSelected = selectedTasks.includes(taskId); // true ako ima id false ako nema - include

    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId)); // odselektovati stavku
    } else {
      setSelectedTasks([...selectedTasks, taskId]); // selektovati stavku
    }
  };

  const handleDeleteSelected = () => {
    deleteTask(selectedTasks);
    // vodje salje u deleteTask te stvake
    setSelectedTasks([]);
    // i refresh
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="box">
      <div className="d-flex justify-content-between">
        <div>
          <button onClick={sortByTitleHandler}>Sortiraj po nazivu</button>
          <button onClick={sortByDateHandler}>Sortiraj po datumu</button>
          {selectedTasks.length > 1 && (
            <button className="bg-danger" onClick={handleDeleteSelected}>
              Obriši selektovane
            </button>
          )}
        </div>

        <div>
          <label htmlFor="selectOption">Ptretrazi po:</label>
          <select id="selectOption" value={selectedOption} onChange={handleChange}>
            <option value=""></option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
          </select>
        </div>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li className="task_list" key={index}>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={() => handleSelectTask(task.id)}
              />
            </div>
            <h3>
              <span className="text-primary">Title: </span>
              {task.task}
            </h3>
            <p>
              <span className="text-primary">Contect: </span>
              {task.sadrzaj}
            </p>
            <p className="tag_box">
              {Object.entries(task.tag).map(
                ([tagName, tagValue], index) =>
                  tagValue && (
                    <span className="tag_text" key={index}>
                      {tagName}
                    </span>
                  )
              )}
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
