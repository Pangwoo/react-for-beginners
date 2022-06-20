import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    const {id} = useParams();
    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setLoading(false);
        setMovie(json.data.movie);
    }

    useEffect(() => {
        getMovie();
    }, [])
    return (
        <div>
            {(loading) ? (<h1>Loading...</h1>) : (null) }
        </div>
   );
}

export default Detail;