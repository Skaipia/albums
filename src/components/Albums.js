import {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
// import Album from "./Album";

const Albums = () => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [albums, setAlbums] = useState([])
    const [photo, setPhoto] = useState([])
    const {id} = useParams();
    const history = useHistory();

    const backButton = () => {
        history.push("/");
    }

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            .then(response => response.json())
            .then(result => {
                    setAlbums(result)
                    setLoaded(true)
                },
                (error) => {
                    setLoaded(true);
                    setError(true)
                });
    }, [id])

    useEffect(() => {
        albums.map(item =>
            fetch(`https://jsonplaceholder.typicode.com/albums/${item.id}/photos`)
                .then(res => res.json())
                .then(result => {
                    setPhoto(photo => [...photo, [result[0].thumbnailUrl, result.length]]);
                })
        )
    }, [albums])

    if (error) {
        return <div className="error">Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="loading">Загрузка...</div>;
    } else {
        return (
            <div>
                <h1>Albums</h1>
                <ul className="album-list">
                    {photo.map((item, index) => (
                        <li className="album_item" key={index}>
                            <Link className="album_item-link" to={`/${id}/${albums[index].id}`}>
                                <img alt="thumbnail" className="album_item-img" src={photo[index][0]}></img>
                                <span className="album_item-count">{photo[index][1]} photos</span>
                                <span className="album_item-title">{albums[index].title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className="back_button" type="button" onClick={backButton}>Back</button>
            </div>
        );
    }
}

export default Albums