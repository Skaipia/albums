import {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
// import Album from "./Album";

const Album = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [albums, setAlbums] = useState([])
    const {id} = useParams();
    console.log('11', useParams())
    useEffect((props) => {
        // fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
        //     .then(response => response.json())
        //     .then(result => {
        //             setLoaded(true);
        //             setAlbums(result)
        //         },
        //         (error) => {
        //             setLoaded(true);
        //             setError(error)
        //         });
    }, [id])



    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                {console.log(albums)}
                <h1>Album</h1>
           <span>dsklf;sldkf;lskdfsd;kf;skd;f</span>
            </div>
        );
    }
}

export default Album