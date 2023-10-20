import { useEffect, useState } from "react";
import axios from "axios";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8080/shopping-list");

        const items = response.data.items;

        items.forEach((item) => {
          console.log(
            `Item: ${item.product} | Quantidade: ${item.quantity}`
          );
        });


        setItems(response.data);

      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    }

    fetchData();
  }, []);

  // return (
  //   <div>
  //     <h1>Lista de Itens</h1>
  //     <ul>
  //       {items.map(item => (
  //         <li key={item._id}>{item.product} | {item.quantity}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}

export default ItemList;
