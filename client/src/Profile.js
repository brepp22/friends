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
    <div className="profile-page">
      <div className="profile-section">
        <h2 className="profile-title">{username}'s Profile</h2>
      </div>
      <div className="liked-pets-section">
        <h3 className="liked-pets-title">Liked Pets</h3>
        <div className="liked-pets-container">
          {likedPets.length > 0 ? (
            <ul className="liked-pets-list">
              {likedPets.map((pet) => (
                <li key={pet.pet_id} className="liked-pet-card">
                  <img src={pet.img} alt={pet.petname} className="pet-image" />
                  <div className="pet-info">
                    <p className="pet-name">{pet.petname}</p>
                    <p className="pet-details">{pet.breed} - {pet.color}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-liked-pets">No Liked Pets Yet...</p>
          )}
        </div>
      </div>
    </div>
  );
  
}  

export default Profile;
