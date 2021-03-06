import { useState } from 'react'

const AddPerson = ({ handleAddPerson }) => {
    const [personName, setPersonName] = useState('');

    const handleNameChange = (e) => {
        setPersonName(e.target.value)
    };

    const handleAddClick = () => {
        if (personName.trim().length > 0) {
            handleAddPerson(personName);
            setPersonName('');
        }
        else {
            setPersonName('Name Needed...')
            setTimeout(() => {
                setPersonName('')
            }, 900);
        }
    };

    return (
        <div className='new-person-input'>
            <input
                cols="100"
                rows="1"
                placeholder='Add New Person'
                maxLength="24"
                value={personName}
                onChange={handleNameChange}>
            </input>
            <button className='add-person-btn' title='Add Person' onClick={handleAddClick}>+</button>
        </div>
    )


}

export default AddPerson