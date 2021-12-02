
import GiftList from './GiftList';
import AddPerson from './AddPerson';

const PeopleList = ({ people, handleAddPerson, handleDeletePerson, currency }) => {
    
    return (
        <div className='people-list-display'>
                {people.map((person, index) => (
                <div key={index}>
                        <GiftList
                            personId={person.id}
                            person={person.name}
                            handleDeletePerson={handleDeletePerson}
                            currency={currency}
                        />
                </div>
            ))}
            <div className='add-new-person'>
                <AddPerson handleAddPerson={handleAddPerson} />
            </div>
        </div>
    );

};

export default PeopleList;