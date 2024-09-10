// import React from 'react'

// function App() {
//   return (
//   <div>
//       <h1>Hello World</h1>
//   </div>
//   )

// }

// export default App 


import React, { useState , useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom'
import Friends from './Friends'
import FriendForm from './FriendForm'
import Login from './Login'
import './App.css'

let id = 0 
const getId = () => ++id

const initialValues = {
  username: '',
  interests: '',
}

let initialFriends = [
  { id: getId(), username: 'Tom', interests: 'Hiking' }
]

export default function App() {
  const [friends, setFriends] = useState([]) 
  const [editing, setEditing] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formValues, setFormValues] = useState(initialValues) 

  const updateForm = (inputName, inputValue) => {
   
    setFormValues({
      ...formValues,
      [inputName]: inputValue,
    })
  }
useEffect(() => {
  if(editing == null) {
    setFormValues(initialValues)
    }else{
      const { username, interests } = friends.find(fr => fr.id == editing)
      setFormValues({ username, interests })
    }
  } , [editing])

  const edit = id => {
    setEditing(id)
  }

  const editExisitingFriend = () => {
    setFriends(prevFriends => prevFriends.map(fr => {
      if(fr.id == editing){
        return {...fr , ...formValues}
      }
        return fr
    }))
    setEditing(null)
  }

  const createNewFriend = () => {
    const {username, interests} = formValues
    const newFriend = {username, interests, id: getId()}
    setFriends([...friends , newFriend])
    setFormValues(initialValues)
  }

  const submitForm = (evt) => {
    evt.preventDefault()
    if(editing){
      editExisitingFriend()
    } else {
      createNewFriend()
    }
    setFormValues(initialValues)
    }


  useEffect(() => {
    setFriends(initialFriends)
  }, [])

  return (
    <BrowserRouter>
        <nav className='nav'>
           <Link to='/'> Login </Link> 
           <Link to="/friends">Friends</Link>
        </nav>

        <Routes>
          <Route path = '/' element = {
            <div className = 'loginForm'>
                <h1> Welcome!  Log In to See Your Friends ... </h1>
              <Login setIsLoggedIn={setIsLoggedIn}/> 
            </div>
            } />
            
            
           
          <Route path ='/friends' element ={
             isLoggedIn ? (
                <div className = 'friendsList' >
                <h1> My Friends </h1>
   
                <FriendForm
                update={updateForm}
                submit={submitForm}
                values={formValues}
                editing={editing}
                />

            {
              friends.map(friend => {
              return (
               <Friends key={friend.id} details={friend} onEdit={edit} />
              )
            })
          }
           </div>
             ) : (
              <Navigate to ='/' />
             )
       } />
      
      
        </Routes>
   
    </BrowserRouter>
  )
}


