import {Component, Fragment} from 'react'
import {Link} from "react-router-dom";
// import Albums from "./Albums";
// import Album from "./Album";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
            albums: [],
            photos: [],
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(result => {
                    this.setState({
                        isLoaded: true,
                        users: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, users} = this.state;
        console.log(users);
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <Fragment>
                    <h1>Users:</h1>
                    <ul className="posts">
                        {users.map(({id, name}) =>
                            <li key={id}><Link to={`/${id}`}>{name}</Link></li>
                        )}
                    </ul>
                </Fragment>
            );
        }
    }
}

export default Users