import React , {useState, useEffect} from 'react'

export default function FriendForm(props) {
    const {
        values,
        update,
        submit,
        editing,
    } = props

    const [pets, setPets] = useState([])
    const [error, setError] = useState(null)

useEffect(() => {
    fetch('http://localhost:9000/api/pets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        setPets(data);
    })
    .catch(error => {
        setError(error); 
    });
} ,[])
    

    return (
        <form>
            <div>
            <h1>Pets List</h1>
            <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        {pet.petname}
                   <p> <img src={pet.img} alt={pet.petname} style={{ width: '300px', height: '300px' }} /></p>
                   <ul> Breed: {pet.breed}</ul> 
                   <ul> Color: {pet.color} </ul>
                   <ul>Weight: {pet.weight} Pounds</ul>
                   <ul>Bio: {pet.bio} </ul>
                    </li> 
                ))}
            </ul>
            </div>
        </form>
    )

}

