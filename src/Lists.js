import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineGift, AiFillGift } from "react-icons/ai";

const List = ({ items, togglePurchased, removeItem, editItem }) => {
    return (
        <div className="gift-list">
        {items.slice(0).reverse().map((item) => {
            const { id, title, price, purchasedStatus } = item;
            return (
                <section className="gift-item" key={id}>
                    <p className="gift-name">{title}</p>
                    <p className="gift-name">{price || 0} CZK</p>
                        <div>
                        <button className="purchased-toggle" title='Mark as Purchased' onClick={() => togglePurchased(id)}
                        >
                        {purchasedStatus? <AiFillGift/> : <AiOutlineGift/>}
                        </button>
                        </div>
                        <div className="btn-container">
                            <button
                            type="button"
                            className="edit-btn"
                            title='Edit'
                            onClick={() => editItem(id)}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button
                            type="button"
                            className="red-icon"
                            title='Remove'
                            onClick={() => removeItem(id)}
                            >
                            <FontAwesomeIcon icon={faTrash} />
                            </button>
                    </div>
                </section>
            );
        })}
        </div>
);
};

export default List;
