import {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import ModalWindow from "./ModalWindow"

const Album = () => {
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [arrayPhotoUrls, setArrayPhotoUrls] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [pointer, setPointer] = useState(0);
    const {idAlbum} = useParams();
    const history = useHistory();

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

    }, [idAlbum])

    useEffect(() => {
        albums.map(item =>
            setArrayPhotoUrls((prev) => [...prev, item.url])
        )
    }, [pointer])

    const nextClick = () => {
        const arrayLength = arrayPhotoUrls.length;
        const newPointer = pointer === arrayLength - 1 ? 0 : pointer + 1;
        setPointer(newPointer);
    }

    const prevClick = () => {
        const arrayLength = arrayPhotoUrls.length;
        const newPointer = pointer === 0 ? arrayLength - 1 : pointer - 1;
        setPointer(newPointer);
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <>
                <div className="header-block">
                    <h1 className="header">Album</h1>
                    <button className="back_button" type="button" onClick={history.goBack}>Back</button>
                </div>
                <ul className="folder_album-ul">
                    {albums.map((item, index) => (
                        <li onClick={() => setPointer(index)} className="folder-album_item"
                            key={item.id}>
                            <a onClick={() => setIsOpen(true)} className="folder-album_item-link">
                                <img alt="thumbnail" className="folder-album_item-img" src={item.thumbnailUrl}/>
                            </a>
                        </li>
                    ))}
                    <ModalWindow
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onNext={nextClick}
                        onPrev={prevClick}
                        src={arrayPhotoUrls[pointer]}
                    />
                </ul>
            </>
        );
    }
}

export default Album