import React from "react";
import axios from "axios";

function TaskForm({ setNote, setContent, note, content, setUpdateTask, updateTask}) {

  const addTask = async (e) => {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    console.log(formattedDate);

    e.preventDefault();
    await axios.post("http://localhost:8000/tasks", { task: note, sadrzaj: content, datum: formattedDate });
    setNote("");
    setContent("");
    setUpdateTask(!updateTask);
  };

  return (
    <>
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
    </>
  );
}

export default TaskForm;
