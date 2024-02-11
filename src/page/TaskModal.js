import React from "react";
import { Modal, Button } from "react-bootstrap";

function TaskModal({ naslov, sadrzaj, show, handleClose, editNaslov, editSadrzaj, indexFunction, edit, seteditNaslov, seteditSadrzaj }) {
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
