import React, { useState, useEffect, useRef } from "react";
import List from "./Gift";
import Alert from "./Alert";
import { MdDeleteForever } from "react-icons/md";
import { nanoid } from 'nanoid';

function GiftList({ personId, person, handleDeletePerson, currency }) {
  const [giftName, setGiftName] = useState('');
  const [price, setPrice] = useState('');
  const [purchased] = useState(false);
  const [giftList, setGiftList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const inputRef = useRef()

  useEffect(() => {
    const savedGiftList = JSON.parse(localStorage.getItem(`myXmasGiftList${person}`))
    if (savedGiftList) {
      setGiftList(savedGiftList);
    }
  }, [person]);

  useEffect(() => {
    localStorage.setItem(`myXmasGiftList${person}`, JSON.stringify(giftList));
  }, [giftList, person]);

  const focus = () => {
    inputRef.current.focus()
  }
  const handleAddGift = (e) => {
    e.preventDefault();
    if (!giftName) {
      showAlert(true, "danger", "please enter a gift");
    }
    else if (!price || Number.isNaN(parseInt(price))) {
      showAlert(true, "danger", "please enter correct price");
    }
    else if (giftName && isEditing && !Number.isNaN(parseInt(price))) {
      setGiftList(
        giftList.map((item) => {
          if (item.id === editID) {
            return {
              ...item, title: giftName, price: price, purchased: purchased, giftee: person
            };
          }
          return item;
        })
      );
      setGiftName("");
      setPrice("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Changes Submited");
    }
    else {
      showAlert(true, "success", "Gift added to the list");
      const newItem = {
        id: nanoid(),
        title: giftName,
        price: price,
        purchased: purchased,
        giftee: person,
      };
      setGiftList([...giftList, newItem]);
      setGiftName("");
      setPrice("");
      focus();
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "gift removed");
    setGiftList(giftList.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = giftList.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setGiftName(specificItem.title);
    setPrice(specificItem.price);
  };

  const togglePurchased = (id) => {
    const newGiftList = [...giftList];
    const specificItem = newGiftList.find((item) => item.id === id);
    specificItem.purchased = !specificItem.purchased
    setGiftList(newGiftList);
  };

  const clearEntireList = () => {
    showAlert(true, "danger", "List cleared");
    setGiftList([]);
  };

  const removePurchasedGifts = () => {
    const newGiftList = giftList.filter(item => !item.purchased)
    showAlert(true, "danger", "Purchased gifts removed");
    setGiftList(newGiftList);
  };

  return (
    <section className="section-center">
      <form className="gift-form" onSubmit={handleAddGift}>
        <h3>{person}</h3>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={giftList} />}
        <div className="form-control">
          <label htmlFor="giftName">
            <input
              type="text"
              className="text-input"
              placeholder="Add Gift..."
              maxLength="25"
              ref={inputRef}
              value={giftName}
              onChange={(e) => setGiftName(e.target.value)}
            />
          </label>
          <label htmlFor="giftPrice">
            <input
              type="text"
              className="text-input"
              placeholder="Expected Price"
              maxLength="7"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button type="Add" className="submit-btn" title="Submit">
            {isEditing ? "edit" : "+"}
          </button>
        </div>
      </form>

      {giftList.length > 0 && (
        <>
          <div className="list-header">
            <p className="list-header-title">Gift name</p>
            <p className="list-header-title">&nbsp;&nbsp;&nbsp;Price</p>
            <span className="list-header-title">
              <p>Purchased &nbsp;</p>
              <p>Edit</p>
            </span>
            
          </div>
          <div className="gift-container">
            <List
              items={giftList}
              togglePurchased={togglePurchased}
              removeItem={removeItem}
              editItem={editItem}
              person={person}
              currency={currency}
            />
            <button className="clear-btn" onClick={removePurchasedGifts}>
              remove purchased gifts
            </button>
            <button className="clear-btn" onClick={() => clearEntireList(person)}>
              clear entire gift list
            </button>
          </div>
        </>
      )}
      <div className="person-delete-btn">
        <button className="person-delete-btn"
          onClick={() => handleDeletePerson(personId, person)}
          title='No Presents for You!'>
          <MdDeleteForever />
        </button>
      </div>
    </section>
  );
}

export default GiftList;
