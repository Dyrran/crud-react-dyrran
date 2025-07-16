import { useState } from "react";

// DataObject is an object with keys: name, age, email.
export default function UserListForm( {DataObject, maxNameLength, btnFunction1, btnLabel1, btnFunction2, btnLabel2, triggerBtnDisable } ) {
    let data = DataObject

    return (
        <div>
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
                        data.map((el, idx) => {
                            return (<tr key={idx}>
                                <td title={el.name}>{truncateText(el.name, maxNameLength)}</td>
                                <td>{el.age}</td>
                                <td>{el.email}</td>
                                <td><button onClick={() => btnFunction1(idx)} disabled={triggerBtnDisable}>{btnLabel1}</button></td>
                                <td><button onClick={() => btnFunction2(el.email)} disabled={triggerBtnDisable}>{btnLabel2}</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
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