import {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";

const Albums = () => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [albums, setAlbums] = useState([])
    const [photo, setPhoto] = useState([])
    const {idUser} = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${idUser}/albums`)
            .then(response => response.json())
            .then(result => {
                    setAlbums(result)
                    setLoaded(true)
                },
                (error) => {
                    setLoaded(true);
                    setError(true)
                });
    }, [idUser])

    useEffect(() => {
        albums.reduce((p, item) => {
            return p
                .then(() => fetch(`https://jsonplaceholder.typicode.com/albums/${item.id}/photos`))
                .then((res) => res.json())
                .then((res) => setPhoto(photo => [...photo, [res[0].thumbnailUrl, res.length]]))
        }, Promise.resolve());
    }, [albums])

    if (error) {
        return <div className="error">Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="loading">Загрузка...</div>;
    } else {
        return (
            <>
                <div className="header-block">
                    <h1 className="header">Albums</h1>
                    <button className="back_button" type="button" onClick={history.goBack}>Back</button>
                </div>
                <ul className="album-list">
                    {photo.map((item, index) => (
                        <li className="album_item" key={index}>
                            <Link className="album_item-link" to={`/${idUser}/${albums[index].id}`}>
                                <img alt="thumbnail" className="album_item-img" src={photo[index][0]}/>
                                <span className="album_item-count">{photo[index][1]} photos</span>
                                <span className="album_item-title">{albums[index].title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default Albums