import {Component} from "react";
import {Link} from "react-router-dom";
import Album from "./Album";

class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            albums: {},
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id || '';

        fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            .then(response => response.json())
            .then(result => {
                    this.setState({
                        isLoaded: true,
                        albums: result
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
        const {error, isLoaded, albums } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <h1>Albums</h1>
                    <ul>
                        {albums.map(({id, title}) => (
                            <li key={id}>
                                <Link to={`/${id}/`}>{title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default Albums