import { useState } from "react"

export default function ModifyUserForm( {onBtnModUser, Index, OldName, OldAge, OldEmail} ) {

    let [newUserName, setNewUserName] = useState(OldName)
    let [newUserAge, setNewUserAge] = useState(OldAge)
    let [newUserEmail, setNewUserEmail] = useState(OldEmail)

    // New user update content
    let handleNewUserName = e => setNewUserName(e.target.value)
    let handleNewUserAge = e => setNewUserAge(e.target.value)
    let handleNewUserEmail = e => setNewUserEmail(e.target.value)

    return (
        <div>
            <h2>Editar usuario</h2>
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
            <button onClick={() => onBtnModUser(newUserEmail, newUserName, newUserAge, Index)}>Guardar cambios</button>
        </div>
    )
}