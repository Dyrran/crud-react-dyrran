import { useState } from "react"

export default function AddModifyUserForm( {onAddUser, BtnText, Title} ) {

    let [newUserName, setNewUserName] = useState("")
    let [newUserAge, setNewUserAge] = useState("")
    let [newUserEmail, setNewUserEmail] = useState("")

    // New user update content
    let handleNewUserName = e => setNewUserName(e.target.value)
    let handleNewUserAge = e => setNewUserAge(e.target.value)
    let handleNewUserEmail = e => setNewUserEmail(e.target.value)

    return (
        <div>
            <h2>{Title}</h2>
            <span>
                <label>Nombre completo</label>
                <input type="text" name="newUserName" value={newUserName} onChange={handleNewUserName}/>
            </span><br/>
            <span>
                <label>Edad</label>
                <input type="number" name="newUserAge" value={newUserAge} onChange={handleNewUserAge}/>
            </span><br/>
            <span>
                <label>Email</label>
                <input type="text" name="newUserEmail" value={newUserEmail} onChange={handleNewUserEmail}/>
            </span><br/>
            <button onClick={() => onAddUser(newUserEmail, newUserName, newUserAge)}>{BtnText}</button>
        </div>
    )
}