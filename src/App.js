import React, {useEffect, useState} from 'react';
import './App.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function App() {
    const [val, setVal] = useState('')
    const [films, setFilms] = useState([])
    const [length, setLength] = useState(0)
    const handleChange = (event) => {
        setVal(event.target.value)
    }
    const showMore = () => {
        setLength(length => length + 10)
    }
    useEffect(() => {
        if (val.length > 1) {
            fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + val, {
                headers: {
                    'X-API-KEY': '1de33b15-1228-4a01-a8e0-2d147682f58f'
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setFilms(data.films)
                    setLength(data.films.length > 10? 10: data.films.length )
                });
        }
    }, [val])
    return (
        <div className="App">
            <h1>Поиск фильмов</h1>
            <TextField label="Фильмы" value={val} onChange={handleChange}/>
            {!!films.length && films.map((film, index) =>index < length?<Film key={film.filmId} film={film}/> : undefined)}
            {films.length - length > 0 &&<div className={'showMore'}>
                <Button variant="contained" color="primary" onClick={showMore}>Показать больше</Button>
            </div>}

        </div>
    );
}

export default App;

const Film = ({film}) => (
    <div  className={'filmItem'}>
        <img src={film.posterUrl} alt=""/>
        <div>
            <h2>{film.nameRu || film.nameEn}</h2>
            <h4>{film.description}</h4>
        </div>
    </div>)
