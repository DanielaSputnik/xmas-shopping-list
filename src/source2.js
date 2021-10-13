import React, { useState, useEffect } from 'react';
import './index.css';
import Lists from './Lists';
import Alert from './Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift,faChevronRight,faChevronLeft, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';


const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

const App = () => {
	// HINT: each "item" in our list names a name,
	// a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
		{ giftName: 'Spacacik', price: 25, isSelected: false },
		{ giftName: 'Keksik', price: 3, isSelected: true },
	]);

	const [inputValue, setInputValue] = useState('');
	const [totalValueCount, setTotalValueCount] = useState(6);

	const handleAddButtonClick = () => {
		const newItem = {
			giftName: inputValue,
			price: 0,
			isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue('');
		calculateTotal();
	};

	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].price++;

		setItems(newItems);
		calculateTotal();
	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

		newItems[index].price--;

		setItems(newItems);
		calculateTotal();
	};

	const toggleComplete = (index) => {
		const newItems = [...items];

		newItems[index].isSelected = !newItems[index].isSelected;

		setItems(newItems);
  };
  
  const removeItem = (index) => {
   // showAlert(true, 'danger', 'item removed');
   // setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    //const specificItem = list.find((item) => item.id === id);
    //setIsEditing(true);
   // setEditID(id);
  //  setName(specificItem.title);
  };  

	const calculateTotal = () => {
		const totalValueCount = items.reduce((total, item) => {
			return total + item.price;
		}, 0);

		setTotalValueCount(totalValueCount);
	};

	return (
		<div className='app-background'>
      <div className='main-container'>
        <div className='title'>Palko</div>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add a gift...' />
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name' onClick={() => toggleComplete(index)}>
								{item.isSelected ? (
									<>
										<FontAwesomeIcon icon={faGift} />
										<span className='completed'>{item.giftName}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.giftName}</span>
									</>
								)}
							</div>
							<div className='price'>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
								</button>
								<span> {item.price} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className='total'>Total: {totalValueCount} CZK</div>
			</div>
		</div>
	);
};

export default App;