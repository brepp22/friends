import React , {useState, useEffect} from 'react'

export default function FriendForm({username}) {
    
    const [pets, setPets] = useState([])
    const [error, setError] = useState(null)
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState({}); 

useEffect(() => {
    fetch('http://localhost:9000/api/pets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then((data) => {
        setPets(data)

        const fetchCommentsPromises = data.map((pet) =>
          fetch(`http://localhost:9000/api/pets/${pet.pet_id}/comments`)
              .then((res) => res.json())
              .then((commentData) => ({
                  pet_id: pet.pet_id,
                  comments: Array.isArray(commentData) ? commentData : [],
              }))
              .catch((error) => {
                  console.error('Error fetching comments:', error)
                  return {  pet_id: pet.pet_id, comments: [] }
              })
      );

      Promise.all(fetchCommentsPromises)
          .then((commentsArray) => {
              const commentsMap = commentsArray.reduce((acc, { pet_id, comments }) => {
                  acc[pet_id] = comments;
                  return acc;
              }, {});

              setComments(commentsMap)
          });
  })
  .catch((error) => {
      setError(error);
  });
}, []);

const handleCommentChange = (evt, petId) => {
    setCommentText({
        ...commentText,
        [petId]: evt.target.value,
    });
};

const handleCommentSubmit = async (evt, petId) => {
    evt.preventDefault()
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

        console.log('Response from server:', response);
        if (!response.ok) {
          throw new Error('Failed to post comment');
        }

        const newComment = await response.json();
        console.log('New comment added:', newComment)
        setComments(prevComments => ({
          ...prevComments,
          [petId]: [...(prevComments[petId] || []), {username, comment: commentTextForPet }],
        }));
        setCommentText(prevCommentTexts => ({
          ...prevCommentTexts,
          [petId]: '',
        }));
      } catch (error) {
        console.error('Error posting comment:', error); 
      }
    } else {
      console.log('Comment text is empty.'); 
    }
  };


    

    return (
       
            <div>
            <ul>
                {pets.map(pet => (
                    <ul key={pet.pet_id}   style={{ 
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

                        <div style={{ marginTop: '20px' }}>
                  <h4>Comments</h4>
                  
                  <div>
              <input
                value={commentText[pet.pet_id] || ''}
                onChange={(evt) => handleCommentChange(evt, pet.pet_id)}
                placeholder="Add a comment"
                style={{
                    width: '600px',
                    height: '35px',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '2px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    backgroundColor: '#f9f9f9',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.border = '2px solid #4CAF50')}
                  onBlur={(e) => (e.target.style.border = '2px solid #ccc')}
                />
                
              <button
                onClick={((evt) => handleCommentSubmit(evt, pet.pet_id))}
                type="button"
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'black',
                  borderRadius: '10px',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Submit Comment
              </button>
              <div>{pet.petname}'s comments</div>
                <div>
                    {(comments[pet.pet_id] || []).map((comment, index) => (
                      <ul key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
                       💬 {comment.username} : {comment.comment}
                      </ul>
                    ))}
                  </div>
              </div> 
                    </div>
                    </div>
                 </ul>
                ))}
            </ul>
              </div>
    )

  }


