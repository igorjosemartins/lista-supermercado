import React, { useState } from "react";
import "./CreateModal.css";
import { Button } from "antd";
import { toast } from "react-toastify";

function CreateModal({ show, handleCreate, handleClose }) {
  
  const [createdItem, setCreatedItem] = useState({
    product: "",
    quantity: "",
  })

  const handleNameChange = (e) => {
    setCreatedItem({ ...createdItem, product: e.target.value });
  }

  const handleQuantityChange = (e) => {
    setCreatedItem({ ...createdItem, quantity: e.target.value });
  }

  const handleCreateConfirm = () => {

    if (!createdItem.product || !createdItem.quantity) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    
    } if ((createdItem.quantity <= 0)) {
      toast.error("A quantidade não pode ser menor ou igual à zero");
      return;
    }
    
    handleCreate(createdItem);
    setCreatedItem({ product: "", quantity: "" });
    handleClose();
  }

  function handleCancel() {
    setCreatedItem({ product: "", quantity: "" });
    handleClose();
  }

  return (
    <div>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <h2>Criar Novo Item</h2>

            <label>Nome do Produto:</label>
            <input 
              type="text" 
              value={createdItem.product}
              onChange={handleNameChange}
            />

            <label>Quantidade:</label>
            <input 
              type="number"
              value={createdItem.quantity}
              onChange={handleQuantityChange}
            />

            <div className="modal-buttons">
              <Button size="large" onClick={handleCancel}>
                Cancelar
              </Button>

              <Button
                size="large"
                type="primary"
                onClick={handleCreateConfirm}
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

export default CreateModal;
