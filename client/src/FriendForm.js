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
                    <ul key={pet.id}   style={{ 
                        border: '2px solid blue', 
                        borderRadius: '8px', 
                        padding: '40px', 
                        maxWidth: '90%', 
                        boxSizing: 'border-box', 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '15px',
                      }}>
                   <img src={pet.img} alt={pet.petname} 
                    style={{ 
                        width: '300px', 
                        height: '300px', 
                        border: '2px solid red', 
                        marginRight: '20px',
                    }}  />
                     <div>
                        <h3>{pet.petname}</h3>
                        <p>Breed: {pet.breed}</p>
                        <p>Color: {pet.color}</p>
                        <p>Weight: {pet.weight} Pounds</p>
                        <p>Bio: {pet.bio}</p>
                    </div>
                 </ul>
                ))}
            </ul>
            </div>
        </form>
    )

}

