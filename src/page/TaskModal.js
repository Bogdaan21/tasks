import React from "react";
import { Modal, Button } from "react-bootstrap";

function TaskModal({ naslov, sadrzaj, show, handleClose, editNaslov, editSadrzaj, indexFunction, edit, seteditNaslov, seteditSadrzaj, editCheckbox, setEditCheckbox }) {

  const handleCheckboxEdit = async (checkboxName) => {
    setEditCheckbox((prev) => ({
      ...prev,
      [checkboxName]: !prev[checkboxName],
    }));
  };


  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Izmjena" : "Da li ste sigurni da zelite izbrisati"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {edit ? (
            <>
              <div className="form-group">
                <label htmlFor="editedTask">Novi naslov:</label>
                <input type="text" id="editNaslov" className="form-control" value={editNaslov} onChange={(e) => seteditNaslov(e.target.value)} />
              </div>
              <div>
                <label htmlFor="editedTask">Novi sadrzaj:</label>
                <textarea type="text" id="editSadrzaj" className="form-control" value={editSadrzaj} onChange={(e) => seteditSadrzaj(e.target.value)} />
              </div>
              <div>
              <label htmlFor="editedTask">Izmijeni tagove:</label>
              <div className="checkbox_box">
            <label className="d-flex align-items-center">
              Frontend
              <input type="checkbox" checked={editCheckbox.Front} onChange={() => handleCheckboxEdit("Front")} />
            </label>
            <label className="d-flex align-items-center">
              Backend
              <input type="checkbox" checked={editCheckbox.Back} onChange={() => handleCheckboxEdit("Back")} />
            </label>
            <label className="d-flex align-items-center">
              Database
              <input type="checkbox" checked={editCheckbox.Database} onChange={() => handleCheckboxEdit("Database")} />
            </label>
          </div>
              </div>
            </>
          ) : (
            <>
            <p>{naslov}</p>
            <p>{sadrzaj}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
          <Button className="primary" onClick={indexFunction}>
            {edit ? "Izmijeni" : "Izbrisi"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TaskModal;
