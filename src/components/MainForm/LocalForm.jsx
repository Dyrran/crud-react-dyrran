import { useState } from "react"
import ModifyUserForm from "../ModifyUserForm/ModifyUserForm"
import AddUserForm from "../AddUserForm/AddUserForm"
import UserListForm from "../UserListForm/UserListForm"

let initialUsers = [
    { "email": "johns@email.com", "name": "John Smith", "age": 40 },
    { "email": "leonk@email.com", "name": "Leon Kennedy", "age": 32 },
    { "email": "ashleyg@email.com", "name": "Ashley Graham", "age": 28 }
]

let maxNameLength = 10

export default function LocalForm() {
    let [users, setUsers] = useState(initialUsers)
    let [searchValue, setSearch] = useState("")
    let [usersFiltered, setUsersFiltered] = useState([])
    let [isSensChecked, setSensChecked] = useState(false)

    // Search textbox update content
    let handleSearch = e => setSearch(e.target.value)

    // Possible values: 0=none, 1=add, 2=edit
    let [showAddModUser, setShowAddModUser] = useState(0)

    let [indexToEdit, setIndexToEdit] = useState(null)
    let formAddModUser = null // Diálogo para mostrar menú de agregar usuario
    let [disableButtons, setDisableButtons] = useState(false) // Desactivar todos los botones deseados a un clic
    let formSearchResults = null // Diálogo para mostrar los resultados de búsqueda
    let [showFormSearchResults, setShowFormSearchResults] = useState(false) // Para activar/desactivar form de mostrar resultados de búsqueda

    function filterUsers(request) {
        return users.filter(
            // CONTINUAR ESTO
            // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            (el) => el.toLowerCase().indexOf(request.toLowerCase()) > -1
        )
    }

    // Search
    // CONTINUAR ESTO
    function fnSearch(criteria) {
        
        if ( setSensChecked == true ) { // Búsqueda exacta, sensible
            if ( criteria == "byName" ) {
                setUsersFiltered(...users.filter(el=>el.name == searchValue))
            } else if ( criteria == "byEmail" ) {
                setUsersFiltered(...users.filter(el=>el.email == searchValue))
            }
        } else if ( setSensChecked == false ) { // Busqueda inexacta
            if ( criteria == "byName" ) {
                setUsersFiltered(...users.filter(filterUsers)) // VERIFICAR
            } else if ( criteria == "byEmail" ) {
                setUsersFiltered(...users.filter(filterUsers)) // VERIFICAR
            }
        }
    }

    let handleCheckboxChange = ( event ) => {
        setSensChecked(event.target.checked)
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
    if ( showAddModUser === 1 ) {
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
            <button onClick={() => fnStartAdd()} disabled={disableButtons}>Nuevo usuario</button>
            {formAddModUser}

            <h2>Buscar un usuario</h2>
            <label>Buscar por</label>
            <select name="searchOptions">
                <option name="byName">Nombre</option>
                <option name="byEmail">Email</option>
            </select>
            <label>Términos de búsqueda</label>
            <input type="text" name="searchValue" value={searchValue} onChange={handleSearch}/>
            <button onClick={() => fnSearch()}>Buscar</button>
            <input type="checkbox" name="searchCaseSensitive" checked={isSensChecked} onChange={handleCheckboxChange}/>
            <label for="searchCaseSensitive">Búsqueda exacta</label>
            {formSearchResults}
            
            <h2>Lista de usuarios</h2>

            <UserListForm
                DataObject={users}
                maxNameLength={maxNameLength}
                btnFunction1={fnStartEdit}
                btnLabel1="Editar"
                btnFunction2={fnDelete}
                btnLabel2="Eliminar"
                triggerBtnDisable={disableButtons}
            />

            {/* <table>
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
                                <td title={el.name}>{truncateText(el.name, maxNameLength)}</td>
                                <td>{el.age}</td>
                                <td>{el.email}</td>
                                <td><button onClick={() => fnStartEdit(idx)} disabled={disableButtons}>Editar</button></td>
                                <td><button onClick={() => fnDelete(el.email)} disabled={disableButtons}>Eliminar</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table> */}

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