import React, { useState } from "react";
import axios from "axios";

function TaskForm({ setUpdateTask, updateTask }) {
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState({
    Front: false,
    Back: false,
    Database: false,
  });

  const addTask = async (e) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // const tagsArray = Object.keys(tag).filter((key) => tag[key]);

    e.preventDefault();
    await axios.post("http://localhost:8000/tasks", { task: note, sadrzaj: content, datum: formattedDate, tag: tag });
    setNote("");
    setContent("");
    setTag({
      Front: false,
      Back: false,
      Database: false,
    });
    setUpdateTask(!updateTask);
  };

  const handleCheckbox = (checkboxName) => {
    setTag((prev) => ({
      ...prev,
      [checkboxName]: !prev[checkboxName],
    }));
  };

  return (
    <>
      <h1>Task</h1>
      <div className="box">
        <form onSubmit={addTask}>
          <input type="text" placeholder="Dodaj task" value={note} onChange={(e) => setNote(e.target.value)} />
          <textarea placeholder="Dodaj detaljan opis" value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="checkbox_box">
            <label className="d-flex align-items-center">
              Frontend
              <input type="checkbox" checked={tag.Front} onChange={() => handleCheckbox("Front")} />
            </label>
            <label className="d-flex align-items-center">
              Backend
              <input type="checkbox" checked={tag.Back} onChange={() => handleCheckbox("Back")} />
            </label>
            <label className="d-flex align-items-center">
              Database
              <input type="checkbox" checked={tag.Database} onChange={() => handleCheckbox("Database")} />
            </label>
          </div>
          <button className="bg-primary" type="submit">
            Dodaj task
          </button>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
