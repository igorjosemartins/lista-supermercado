import React from 'react';
import { Button } from "antd";
import "./DeleteModal.css";

function DeleteModal({ show, handleClose, handleDelete }) {
  
  if (!show) {
    return null;
  }

  return (
    
    <div className="modal">
      <div className="modal-content">
        <p>Tem certeza que deseja excluir este item?</p>
        <div className="modal-buttons">
          <Button 
            size="large" 
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button 
            size="large" 
            type="primary" 
            danger 
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;