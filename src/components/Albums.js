import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
// import Album from "./Album";

const Albums = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [albums, setAlbums] = useState([])

    const {id} = useParams();
    useEffect((props) => {

        console.log(props)
        // const id = this.props.match.params.id || '';

        fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            .then(response => response.json())
            .then(result => {
                    setLoaded(true);
                    setAlbums(result)
                },
                (error) => {
                    setLoaded(true);
                    setError(error)
                });
    }, [id])


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                {console.log(albums)}
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

export default Albums