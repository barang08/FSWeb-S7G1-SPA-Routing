import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FilmListesi from './Filmler/FilmListesi';
import {
  Switch, Route
} from "react-router-dom";
import Film from "./Filmler/Film"

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);




  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then(response => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = id => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    const filmVarMi = saved.find((film) => film.id === Number(id));
    if (!filmVarMi) {
      const filmiKaydet = movieList.find((film) => film.id === Number(id));
      setSaved(...saved, filmiKaydet)
    }
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      <div>
        <Switch>
          <Route path="/filmler/:id" >
            <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
          </Route>
          <Route path="/" movies={FilmListesi}>
            <FilmListesi movies={movieList} />
          </Route>


        </Switch>
      </div>
    </div>
  );
}
