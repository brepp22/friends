import React, { useState, useEffect } from 'react';

function Profile({ username }) { 
  const [likedPets, setLikedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch(`/api/user/${username}/liked-pets`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch liked pets');
        }
        return response.json();
      })
      .then(data => {
        setLikedPets(data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching liked pets:', error);
        setLoading(false); 
      });
  }, [username]); 

  if (loading) {
    return <div>Loading liked pets...</div>; 
  }

  return (
    <div>
      <h2>{username}'s Profile</h2>
      <h3>Liked Pets</h3>
      <div>
        {likedPets.length > 0 ? (
          <ul>
            {likedPets.map(pet => (
              <li key={pet.pet_id}>
                <img src={pet.img} alt={pet.petname} />
                <p>{pet.petname} - {pet.breed} - {pet.color}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No liked pets found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
