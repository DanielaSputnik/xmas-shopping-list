import React, { useState, useEffect } from "react";
import List from "./Lists";
import Alert from "./Alert";
import { AiOutlineGift, AiFillGift } from "react-icons/ai";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [purchasedStatus, setPurchaseStatus] = useState(false);
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);  
  const [totalValueCount, setTotalValueCount] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name ) {
      showAlert(true, "danger", "please enter a gift");
    }
    else if (!price || Number.isNaN(parseInt(price))) {
      showAlert(true, "danger", "please enter correct price");
    }
    else if (name && isEditing && !Number.isNaN(parseInt(price))) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {...item, title: name, price: price};
          }
          return item;
        })
      );
      setName("");
      setPrice("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Changes Submited");
    } else {
      showAlert(true, "success", "Gift added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        price: price,
      };
      setList([...list, newItem]);
      setName("");
      setPrice("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "List cleared");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "gift removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
    setPrice(specificItem.price);
  };

  const togglePurchased = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setPurchaseStatus(specificItem.purchasedStatus = !purchasedStatus);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  
  const calculateTotal = () => {
    const totalValueCount = list.reduce((total, item) => {
      return parseInt(total) + parseInt(item.price);
    },0);
    setTotalValueCount(totalValueCount);
    setShowTotal(!showTotal);
  };
  
  return (
    <section className="section-center">
      <form className="gift-form" onSubmit={handleSubmit}>
        <h3>Palko</h3>
        {list.length > 0 && showTotal && (
          <h4> Total for Palko: {totalValueCount} CZK</h4>
        )}

        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <div className="form-control">
          <label htmlFor="giftName">
            <input
              type="text"
              className="gift"
              placeholder="Add Gift..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="giftPrice">
            <input
              type="text"
              className="gift"
              placeholder="Expected Price"
              autoFocus
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button type="Add" className="submit-btn" title="Submit">
            {isEditing ? "edit" : "add"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <>
          <div className="list-header">
            <p className="list-header-title">Gift name</p>
            <p className="list-header-title">Price</p>
            <p className="list-header-title">
              Purchased &nbsp;&nbsp;&nbsp;&nbsp; Edit
            </p>
          </div>
          <div className="gift-container">
            <List
              items={list}
              togglePurchased={togglePurchased}
              removeItem={removeItem}
              editItem={editItem}
            />
            <button className="clear-btn" onClick={calculateTotal}>
              Calculate Total
            </button>
            <button className="clear-btn" onClick={clearList}>
              clear this gift list
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default App;
