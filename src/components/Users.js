import {useState, useEffect} from "react";
import {Link} from "react-router-dom";


const Users = () => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(result => {
                    setLoaded(true);
                    setUsers(result)
                },
                (error) => {
                    setLoaded(true);
                    setError(true)
                });
    })

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <>
                <h1>Users:</h1>
                <ul className="users_list">
                    {users.map(user =>
                        <li className="users_list-item" key={user.id}><Link to={`/${user.id}`}>{user.name}</Link></li>
                    )}
                </ul>
            </>
        );
    }
}

export default Users