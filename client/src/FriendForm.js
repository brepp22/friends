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
            <ul>
                {pets.map(pet => (
                    <ul key={pet.id} style={{border: '2px solid blue', borderRadius: '8px' , padding: '40px', maxWidth: '90%', boxSizing: 'border-box'}}>
                        {pet.petname}
                   <p> <img src={pet.img} alt={pet.petname} style={{ width: '300px', height: '300px' ,border: '2px solid red'}} /></p>
                   <ul> Breed: {pet.breed}</ul> 
                   <ul> Color: {pet.color} </ul>
                   <ul>Weight: {pet.weight} Pounds</ul>
                   <ul>Bio: {pet.bio} </ul>
                    </ul> 
                ))}
            </ul>
            </div>
        </form>
    )

}

