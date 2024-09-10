import React from 'react'

export default function FriendForm(props) {
    const {
        values,
        update,
        submit,
        editing,
    } = props

    const onChange = (evt) => {
        const name = evt.target.name
        const {value} = evt.target

        update(name, value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit(evt)
    }

    return (
        <form className = 'form information' onSubmit={onSubmit}>
            <div className = 'form inputs'>
                <label> 
                    Username 
                    <input
                    name = 'username'
                    type ='text'
                    placeholder = 'type username ...'
                    value = {values.username}
                    onChange = {onChange}
                    />
                </label>
                <div>
                <label>
                    Interests
                <select value={values.interests} name='interests' onChange={onChange}>
                    <option value=''>-- Select an Interest --</option>
                    <option value='Music'>Music</option>
                    <option value='Hiking'>Hiking</option>
                    <option value='Crochet'>Crochet</option>
                    <option value='Gardening'>Gardening</option>
                </select>
                </label></div>
                <div>
                <div className='submit'>
          <button disabled={!values.username || !values.interests}>{editing ? 'Edit' : 'Add'} a Friend</button>
               </div> </div>
            </div>
        </form>
    )

}