import {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";

const Album = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [albums, setAlbums] = useState([])
    const {idUser, idAlbum} = useParams();
    const history = useHistory();

    const backButton = (props) => {
        history.push(`/${idUser}`);
    }

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${idAlbum}/photos`)
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


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                {console.log(albums)}
                <div className="header-block">
                    <h1 className="header">Album</h1>
                    <button className="back_button" type="button" onClick={backButton}>Back</button>
                </div>

                <ul className="folder_album-ul">
                    {albums.map(item => (
                        <li className="folder-album_item" key={item.id}>
                            <a className="folder-album_item-link">
                                <img alt="photo" className="folder-album_item-img" src={item.thumbnailUrl}></img>
                            </a>
                        </li>
                    ))}
                </ul>

            </div>
        );
    }
}

export default Album