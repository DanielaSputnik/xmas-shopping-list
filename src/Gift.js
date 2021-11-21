import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineGift, AiFillGift } from "react-icons/ai";

const List = ({ items, togglePurchased, removeItem, editItem, person, currency }) => {
    return (
        <div className="gift-list">
        {items.slice(0).reverse().map((item) => {
            const { id, title, price, purchased, giftee } = item;
            if (giftee === person) {
            return (
                <section className="gift-item" key={id}>
                    <p className="gift-name">{title}</p>
                    <p className="price">{price} {currency}</p>
                        <div>
                        <button className="purchased-toggle" title='Mark as Purchased' onClick={() => togglePurchased(id)}
                            style={{ color: purchased ? 'var(--clr-red-dark)' : 'var(--clr-grey-5)'}}
                        >
                        {purchased? <AiFillGift/> : <AiOutlineGift/>}
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
                )
            }
            else return ('')
        })}
        </div>
);
};

export default List;
