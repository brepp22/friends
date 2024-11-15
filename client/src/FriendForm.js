import React, { useState, useEffect } from 'react';

export default function FriendForm({ username }) {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState({});
    const [showAllComments, setShowAllComments] = useState({});
    const [likedPets, setLikedPets] = useState({});


    useEffect(() => {
        fetch('http://localhost:9000/api/pets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPets(data);
    
            const initialLikedPets = data.reduce((acc, pet) => {
                acc[pet.pet_id] = pet.like; 
                return acc;
            }, {});
            setLikedPets(initialLikedPets);
    
            const fetchCommentsPromises = data.map((pet) =>
                fetch(`http://localhost:9000/api/pets/${pet.pet_id}/comments`)
                    .then((res) => res.json())
                    .then((commentData) => ({
                        pet_id: pet.pet_id,
                        comments: Array.isArray(commentData) ? commentData : [],
                    }))
                    .catch((error) => {
                        console.error('Error fetching comments:', error);
                        return { pet_id: pet.pet_id, comments: [] };
                    })
            );
    
            Promise.all(fetchCommentsPromises)
                .then((commentsArray) => {
                    const commentsMap = commentsArray.reduce((acc, { pet_id, comments }) => {
                        acc[pet_id] = comments;
                        return acc;
                    }, {});
    
                    setComments(commentsMap);
    
                    const showAllInit = data.reduce((acc, pet) => {
                        acc[pet.pet_id] = false; 
                        return acc;
                    }, {});
                    setShowAllComments(showAllInit);
                });
        })
        .catch((error) => {
            setError(error);
        });
    }, []);

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:9000/api/users/${username}/liked-pets`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => 
                res.json())
            .then((likedPets) => {
                const likedPetsMap = likedPets.reduce((acc, pet) => {
                    acc[pet.pet_id] = true;
                    return acc;
                }, {});
                setLikedPets(likedPetsMap); 
            })
            .catch((error) => {
                console.error('Error fetching liked pets:', error);
            });
        }
    }, [username]);

  
    
    
    

    const handleCommentChange = (evt, petId) => {
        setCommentText({
            ...commentText,
            [petId]: evt.target.value,
        });
    };

    const handleCommentSubmit = async (evt, petId) => {
        evt.preventDefault();
        const commentTextForPet = commentText[petId] || '';
        if (commentTextForPet.trim()) {
            try {
                const response = await fetch(`http://localhost:9000/api/pets/${petId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, comment: commentTextForPet }),
                });

                if (!response.ok) {
                    throw new Error('Failed to post comment');
                }

                const newComment = await response.json();
                setComments(prevComments => ({
                    ...prevComments,
                    [petId]: [newComment, ...(prevComments[petId] || [])],
                }));
                setCommentText(prevCommentTexts => ({
                    ...prevCommentTexts,
                    [petId]: '',
                }));
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    const handleToggleComments = (petId) => {
        setShowAllComments(prevState => ({
            ...prevState,
            [petId]: !prevState[petId], 
        }));
    };


    const handleLikeToggle = async (petId) => {
        const newLikeStatus = !likedPets[petId];
    
        try {
            const response = await fetch(`http://localhost:9000/api/pets/${petId}/like`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, like: newLikeStatus }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update like status');
            }
    
            setLikedPets(prevLikedPets => ({
                ...prevLikedPets,
                [petId]: newLikeStatus,
            }));
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };
    
    
    

    return (
        <div className='pet-container'>
            <ul>
                {pets.map(pet => (
                    <ul key={pet.pet_id} style={{ 
                        border: '2px solid rgb(112, 73, 47)', 
                        borderRadius: '8px', 
                        padding: '40px', 
                        maxWidth: '90%', 
                        boxSizing: 'border-box', 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '15px',
                    }}>
                        <img src={pet.img} alt={pet.petname} style={{ 
                            width: '300px', 
                            height: '300px', 
                            border: '2px solid rgb(112, 73, 47)', 
                            marginRight: '20px',
                        }} />
                        <div>
                            <h3>{pet.petname}</h3>
                            <p>Breed: {pet.breed}</p>
                            <p>Color: {pet.color}</p>
                            <p>Weight: {pet.weight} Pounds</p>
                            <p>Bio: {pet.bio}</p>

                            <div style={{ marginTop: '20px' }}>
                                <h4>Comments</h4>

                                <div>
                                    <input
                                        value={commentText[pet.pet_id] || ''}
                                        onChange={(evt) => handleCommentChange(evt, pet.pet_id)}
                                        placeholder="Add a comment"
                                        style={{
                                            width: '600px',
                                            height: '40px',
                                            padding: '10px',
                                            marginBottom: '10px',
                                            border: '2px solid #ccc',
                                            borderRadius: '5px',
                                            fontSize: '16px',
                                            boxSizing: 'border-box',
                                            backgroundColor: '#f9f9f9',
                                            outline: 'none',
                                            marginTop: '10px',
                                        }}
                                        onFocus={(e) => (e.target.style.border = '2px solid rgb(112, 73, 47)')}
                                        onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
                                    />
                                    
                                    <button
                                        onClick={(evt) => handleCommentSubmit(evt, pet.pet_id)}
                                        type="button"
                                        style={{
                                            padding: '10px',
                                            backgroundColor: 'rgb(112, 73, 47)',
                                            borderRadius: '10px',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            marginLeft: '5px',
                                            height: '35px',
                                        }}
                                    >
                                        Submit Comment
                                    </button>

                                    <button
                                        onClick={() => handleToggleComments(pet.pet_id)}
                                        type="button"
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: 'rgb(112, 73, 47)',
                                            borderRadius: '10px',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            marginLeft: '10px',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        {showAllComments[pet.pet_id] ? 'Show Recent' : 'Show All'}
                                    </button>

                                    <div>{pet.petname}'s comments</div>
                                    <div>
                                        {(showAllComments[pet.pet_id] ? comments[pet.pet_id] : comments[pet.pet_id]?.slice(0, 3) || []).map((comment, index) => (
                                            <ul key={index} style={{ marginTop: '10px', marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
                                                💬 {comment.username} : {comment.comment}
                                            </ul>
                                        ))}
                                    </div>
                                </div> 

                                <button
                                    onClick={() => handleLikeToggle(pet.pet_id)}
                                    style={{
                                        backgroundColor: likedPets[pet.pet_id] ? 'red' : 'gray',
                                        border: 'none',
                                        color: 'white',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                    }}
                                >
                                    {likedPets[pet.pet_id] ? '❤️ Liked' : '♡ Like'}
                                </button>
                            </div>
                        </div>
                    </ul>
                ))}
            </ul>
        </div>
    );
}


