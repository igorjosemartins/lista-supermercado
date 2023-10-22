import "./ItemTable.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify"
import SuccessNotification, { notifySuccess } from "./SuccessNotification.jsx";
import DeleteModal from "./DeleteModal/DeleteModal.jsx";
import EditModal from "./EditModal/EditModal.jsx";
import CreateModal from "./CreateModal/CreateModal.jsx";

const { Search } = Input;

function ItemTable() {
  // ITEMS
  const [items, setItems] = useState([])
  const [showItemsResults, setShowItemsResults] = useState(false)
  const [itemsNotFound, setItemsNotFound] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:8080/shopping-list")
      .then((res) => {
        setItems(res.data.items)
        setShowItemsResults(true)
        setItemsNotFound(false)
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          setItemsNotFound(true)
          setShowItemsResults(false)
        }
      })
  }, [])

  // SEARCH
  const [searchItem, setSearchItem] = useState([])
  const [showSearchItem, setShowSearchItem] = useState(false)
  const [searchNotFound, setSearchNotFound] = useState(false)

  const handleSearch = (searchItem) => {
    if (searchItem) {
      axios
        .get(`http://localhost:8080/shopping-list/search/${searchItem}`)
        .then((res) => {
          setSearchItem(res.data)
          setShowSearchItem(true)
          setSearchNotFound(false)

          setShowItemsResults(false)
        })
        .catch(function (error) {
          if (error.response.status === 404) {
            setSearchNotFound(true)
            setShowSearchItem(false)

            setShowItemsResults(false)
          }
        })
    } else {
      setSearchItem([])
      setShowSearchItem(false)
      setSearchNotFound(false)

      setShowItemsResults(true)
    }
  }

  // CREATE MODAL
  const [showCreateModal, setShowCreateModal] = useState(false);

  const addNewItem = (newItem) => {
    setItems([...items, newItem])
  }

  const handleCreate = (createdItem) => {

    axios.post("http://localhost:8080/shopping-list/create", createdItem)
      .then(() => {
        notifySuccess("Item criado com sucesso!")
        addNewItem(createdItem);
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          toast.error("O Item não existe")
        } else {
          toast.error("Ocorreu um erro ao editar o item")
          console.log(error)
        }
      });

    setShowCreateModal(false);
  }

  // EDIT MODAL
  const [itemToEdit, setItemToEdit] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleEditClick = (item) => {
    setItemToEdit(item)
    setShowEditModal(true)
  }

  const updateItemState = (editedItem) => {
    const updatedItems = items.map((item) => {
      if (item._id === itemToEdit._id) {
        return editedItem;
      }
      return item;
    })

    setItems(updatedItems)
  }

  const handleEdit = (editedItem) => {
    if (itemToEdit) {
      axios
        .put(
          `http://localhost:8080/shopping-list/edit/${itemToEdit._id}`,
          editedItem
        )
        .then((res) => {
          notifySuccess("Item editado com sucesso!")
          updateItemState(editedItem)
        })
        .catch(function (error) {
          if (error.response.status === 404) {
            toast.error("O Item não existe")
          } else {
            toast.error("Ocorreu um erro ao editar o item")
            console.log(error)
          }
        })

      setShowEditModal(false)
    }
  }

  // DELETE MODAL
  const [itemToDelete, setItemToDelete] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDeleteClick = (item) => {
    setItemToDelete(item)
    setShowDeleteModal(true)
  }

  const handleDelete = () => {
    if (itemToDelete) {
      axios
        .delete(
          `http://localhost:8080/shopping-list/delete/${itemToDelete._id}`
        )
        .then(() => {
          notifySuccess("Item excluído com sucesso!")
        })
        .catch(function (error) {
          if (error.response.status === 404) {
            toast.error("O Item já foi apagado")
          } else {
            toast.error("Ocorreu um erro ao excluir o item")
            console.log(error)
          }
        })

      setShowDeleteModal(false)
      setItems(items.filter((item) => item._id !== itemToDelete._id))

      if (items.length <= 1) {
        setItemsNotFound(true)
        setShowItemsResults(false)
      }
    }
  }

  return (
    <div>
      <Search
        placeholder="Pesquisar item"
        style={{ width: 250 }}
        onSearch={handleSearch}
      />

      <br />
      <br />

      <h2>Itens Criados</h2>
      <Button onClick={() => setShowCreateModal(true)}>Criar Novo Item</Button>

      <br />
      <br />

      {itemsNotFound && <h3>Não há itens criados ainda...</h3>}

      {searchNotFound && <h3>Item não encontrado</h3>}

      {showSearchItem && (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr key={searchItem._id}>
              <td>{searchItem.product}</td>
              <td>{searchItem.quantity}</td>
              <td>
                <Button
                  type="primary"
                  ghost
                  onClick={() => handleEditClick(searchItem)}
                >
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  danger
                  ghost
                  onClick={() => handleDeleteClick(searchItem)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {showItemsResults && (
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => handleEditClick(item)}
                  >
                    Editar
                  </Button>
                </td>
                <td>
                  <Button danger ghost onClick={() => handleDeleteClick(item)}>
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <CreateModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        handleCreate={handleCreate}
      />

      <EditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleEdit={handleEdit}
        itemToEdit={itemToEdit}
      />

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />

      <SuccessNotification />
    </div>
  )
}

export default ItemTable
