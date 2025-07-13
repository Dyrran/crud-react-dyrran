import { useState } from "react"
import AddModifyUserForm from "../AddModifyUserForm/AddModifyUserForm"

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

    // Add user to list
    function fnAdd(email, name, age) {
        setUsers([...users, {
            "email": email,
            "name": name,
            "age": age
            }]
        );
        setNewUserName("");
        setNewUserAge("");
        setNewUserEmail("");
    }

    // Editar elemento de la lista de usuarios.
    function fnEdit(itemIndex) {

    }

    // Eliminar elemento de la lista de usuarios.
    function fnDelete(itemEmail) {
        const updatedUsers = users.filter(user => user.email !== itemEmail);
        setUsers(updatedUsers);
    }

    return (
        <div>
            <h1>CRUD React</h1>
            <h2>Buscar usuario</h2>
            <span>
                <label>Buscar usuario</label>
                <input type="text" name="searchValue" value={searchValue} onChange={handleSearch}/>
                <button>Buscar</button>
            </span>
            <h2>Lista de usuarios</h2>
            <button>Nuevo usuario</button>

            <AddModifyUserForm
                onAddUser={fnAdd}
                BtnText="Agregar"
                Title="Agregar usuario"
            />
            

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
                                <td><button onClick={fnEdit(idx)}>Editar</button></td>
                                <td><button onClick={() => fnDelete(el.email)}>Eliminar</button></td>
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