import { useState } from "react"

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
            
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((el, idx) => {
                            return (<tr key={idx}>
                                <td>{el.email}</td>
                                <td>{truncateText(el.name, maxNameLength)}</td>
                                <td>{el.age}</td>
                                <td><button>Editar</button></td>
                                <td><button>Eliminar</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>

            <span>
                <p>Usuarios: {Object.keys(initialUsers).length}</p>
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