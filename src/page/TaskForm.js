import React from "react";

function TaskForm({addTask, setNote, setContent, note, content}) {
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
