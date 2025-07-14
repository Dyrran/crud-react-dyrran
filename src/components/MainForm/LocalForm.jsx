import { useState } from "react"
import ModifyUserForm from "../ModifyUserForm/ModifyUserForm"
import AddUserForm from "../AddUserForm/AddUserForm"

let initialUsers = [
    { "email": "johns@email.com", "name": "John Smith", "age": 40 },
    { "email": "leonk@email.com", "name": "Leon Kennedy", "age": 32 },
    { "email": "ashleyg@email.com", "name": "Ashley Graham", "age": 28 }
]

let maxNameLength = 10

export default function LocalForm() {
    let [users, setUsers] = useState(initialUsers)
    let [searchValue, setSearch] = useState("")
    
    // Search textbox update content
    let handleSearch = e => setSearch(e.target.value)
    let [newUserName, setNewUserName] = useState("")
    let [newUserAge, setNewUserAge] = useState("")
    let [newUserEmail, setNewUserEmail] = useState("")

    // Possible values: 0=none, 1=add, 2=edit
    let [showAddModUser, setShowAddModUser] = useState(0)

    let [indexToEdit, setIndexToEdit] = useState(null)
    let formAddModUser = null
    let [disableButtons, setDisableButtons] = useState(false)

    // Search
    function fnSearch() {
        
    }

    // Add user to list
    function fnAdd(email, name, age) {
        setUsers([...users, {
            "email": email,
            "name": name,
            "age": age
            }]
        );
        setShowAddModUser(null);
        setDisableButtons(false);
    }

    // Iniciar proceso de crear elemento para la lista de usuarios.
    function fnStartAdd() {
        setShowAddModUser(1);
        setDisableButtons(true);
    }

    // Iniciar proceso de editar elemento de la lista de usuarios.
    function fnStartEdit(itemIndex) {
        setShowAddModUser(2)
        setIndexToEdit(itemIndex)
        setDisableButtons(true);
    }

    // Actualizar cambios en item editado
    function fnUpdate(email, name, age, index) {
        const editedUsers = users;
        editedUsers[index] = {
            "email": email,
            "name": name,
            "age": age
            };
        setUsers(editedUsers);
        setShowAddModUser(null);
        setDisableButtons(false);
    }

    // Eliminar elemento de la lista de usuarios.
    function fnDelete(itemEmail) {
        const updatedUsers = users.filter(user => user.email !== itemEmail);
        setUsers(updatedUsers);
    }

    function fnHideAddModUser() {
        setShowAddModUser(null);
        setDisableButtons(false);
    }

    // Decidir cuál formulario mostrar: agregar o editar ítem.
    if ( showAddModUser === 1) {
        formAddModUser = (
            <div>
                <AddUserForm
                    onBtnAddUser={fnAdd}
                />
                <button onClick={fnHideAddModUser}>Cerrar</button>
            </div>
        )
    } else if ( showAddModUser === 2 ) {
        formAddModUser = (
            <div>
                <ModifyUserForm
                    onBtnModUser={fnUpdate}
                    Index={indexToEdit}
                    OldName={users[indexToEdit].name}
                    OldAge={users[indexToEdit].age}
                    OldEmail={users[indexToEdit].email}
                />
                <button onClick={fnHideAddModUser}>Cerrar</button>
            </div>
        )
    }

    return (
        <div>
            <h1>CRUD React</h1>
            <h2>Buscar un usuario</h2>
            <label>Buscar por</label>
            <select name="searchOptions">
                <option name="byName">Nombre</option>
                <option name="byEmail">Email</option>
            </select>
            <label>Términos de búsqueda</label>
            <input type="text" name="searchValue" value={searchValue} onChange={handleSearch}/>
            <button onClick={() => fnSearch()}>Buscar</button>
            <input type="checkbox" name="searchCaseSensitive"/>
            <label for="searchCaseSensitive">Búsqueda exacta</label>

            <h2>Lista de usuarios</h2>
            <button onClick={() => fnStartAdd()} disabled={disableButtons}>Nuevo usuario</button>

            <div>
                {formAddModUser}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((el, idx) => {
                            return (<tr key={idx}>
                                <td>{truncateText(el.name, maxNameLength)}</td>
                                <td>{el.age}</td>
                                <td>{el.email}</td>
                                <td><button onClick={() => fnStartEdit(idx)} disabled={disableButtons}>Editar</button></td>
                                <td><button onClick={() => fnDelete(el.email)} disabled={disableButtons}>Eliminar</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>

            <span>
                <p>Usuarios: {Object.keys(users).length}</p>
            </span>
        </div>
    )
}

function truncateText(text, maxLength) {
    if ( text.length > maxLength ) {
        return text.slice(0, maxLength - 3) + "..."
    }
    else {
        return text
    }
}