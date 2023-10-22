import React, { useState, useEffect } from "react";
import "./EditModal.css";
import { Button } from "antd";
import { toast } from "react-toastify";

function EditModal({ show, handleClose, handleEdit, itemToEdit }) {
  
  const [editedItem, setEditedItem] = useState({ ...itemToEdit});

  useEffect(() => {
    setEditedItem({ ...itemToEdit })
  }, [itemToEdit]);

  const handleNameChange = (e) => {
    setEditedItem({ ...editedItem, product: e.target.value });
  }

  const handleQuantityChange = (e) => {
    setEditedItem({ ...editedItem, quantity: e.target.value });
  }

  const handleEditConfirm = () => {

    if (!editedItem.product || !editedItem.quantity) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    
    } if ((editedItem.quantity <= 0)) {
      toast.error("A quantidade não pode ser menor ou igual à zero");
      return;
    }
    
    handleEdit(editedItem);
    handleClose();  
  }

  return (
    <div>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Item</h2>

            <label>Nome do Produto:</label>
            <input 
              type="text" 
              value={editedItem.product}
              onChange={handleNameChange}
            />

            <label>Quantidade:</label>
            <input 
              type="number"
              value={editedItem.quantity}
              onChange={handleQuantityChange}
            />

            <div className="modal-buttons">
              <Button size="large" onClick={handleClose}>
                Cancelar
              </Button>

              <Button
                size="large"
                type="primary"
                onClick={handleEditConfirm}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditModal;
