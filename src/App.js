import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import PeopleList from './PeopleList';
import Alert from './Alert';

const XmasApp = () => {
    const [currency, setCurrency] = useState('CZK')
    const [peopleList, setPeopleList] = useState([
        {
            id: 'myself01',
            name: 'Myself'
        }    ]);
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

    useEffect(() => {
        const savedLists = JSON.parse(localStorage.getItem('myXmasPeopleList'));
        const savedCurrency = JSON.parse(localStorage.getItem('myXmasCurrency'));
        if (savedLists) {
            setPeopleList(savedLists);
        }
        if (savedCurrency) {
            setCurrency(savedCurrency);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('myXmasPeopleList', JSON.stringify(peopleList));
    }, [peopleList])
    useEffect(() => {
        localStorage.setItem('myXmasCurrency', JSON.stringify(currency));
    }, [currency])

    const addPerson = (personName) => {
        if (peopleList.find(i => i.name === personName)) {
            showAlert(true, "danger", "Person Name Must Be Unique");
            }
        else {
            showAlert(true, "success", "Person Added");
            const newPerson = {
                id: nanoid(),
                name: personName,
            };
            const newPeopleList = [...peopleList, newPerson];
            setPeopleList(newPeopleList);
        }
    }

    const deletePerson = (id, name) => {
        showAlert(true, "danger", "Person Removed");
        const newPeopleList = peopleList.filter((person) => person.id !== id);
        localStorage.removeItem(`myXmasGiftList${name}`);
        setPeopleList(newPeopleList);
    }

    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
    };

    return (
        <>
            <div className='app-header'>
                X-MAS GIFT LISTS
            </div>
            <div>
                Currency:
                <input type="text" className='currency-selector' onChange={handleCurrencyChange} maxLength="3" placeholder={currency} />
            </div>
            <div className='container'>
                {alert.show && <Alert {...alert} removeAlert={()=> showAlert()} list={peopleList} />}
                <PeopleList
                    people={peopleList}
                    handleAddPerson={addPerson}
                    handleDeletePerson={deletePerson}
                    currency={currency}
                />
            </div>
        </>
    );
};

export default XmasApp;