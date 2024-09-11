import React from 'react'

export default function Friends ({details, onEdit}) {
    const {id , username, interests} = details 
    const handleEdit = () => {
        onEdit(id)
    } 
    if(!details){
        return <h3> Fetching pet's details ... </h3>
    }

return (
    <div className = 'friend information'>
        <h2>{details.username}</h2>
        <p>Interests: {details.interests}</p>
        <button onClick ={handleEdit}>Edit </button>
    </div>
)
}