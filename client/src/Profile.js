import React, { useState, useEffect } from 'react';
import './App.css'

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
    <div className='profile'>
      <h2>{username}'s Profile</h2>
      <h3>Liked Pets</h3>
      <div className='profile-like-pet'>
        {likedPets.length > 0 ? (
          <ul>
            {likedPets.map(pet => (
              <div key={pet.pet_id}>
                <img src={pet.img} alt={pet.petname} />
                <p>{pet.petname} - {pet.breed} - {pet.color}</p>
              </div>
            ))}
          </ul>
        ) : (
          <p>No Liked Pets Yet...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
