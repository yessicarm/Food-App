import React from "react";
import { Cards } from "../components/Index";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import {
  filterRecipesByDiet,
  filterByName,
  filterByScore,
  getDiets,
  getRecipes,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import styles from "./ccs/home.module.css";
import navbarhe from "./ccs/navbarhe.png";

const Home = () => {
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  //-----Pagination<<<
  const [currentPage, setCurrentPage] = useState(1); //pagina actual
  const [recipesPerPage, setRecipesPerPage] = useState(9); // cuantas recetas por pagina
  const indexOfLastREcipe = currentPage * recipesPerPage; // pagina actual * cantidad de recetas [9]
  const indexOfFirstRecipe = indexOfLastREcipe - recipesPerPage; // 0
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastREcipe
  ); // constante que guarda todos los personajes de ese momento

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber); //setea el numero de pagina actual
  };

  const [orden, setOrden] = useState("");
  const [orden1, setOrden1] = useState("");

  useEffect(() => {
    //traigo las recetas cuando el componente se monta.
    dispatch(getRecipes());
  }, [dispatch]); //de lo que depende

  function handleDiets(e) {
    e.preventDefault();
    dispatch(filterRecipesByDiet(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(filterByName(e.target.value)); //despacho la action
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`); //para cuando setee la pagina modifique el estado local y se renderice
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(filterByScore(e.target.value));
    setCurrentPage(1);
    setOrden1(`Ordenado ${e.target.value}`);
  }

  return (
    <div className={styles.principal}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <img src={navbarhe} alt="navbar" width={960} height={100} />
        </div>
        <div className={styles.searchbar}>
          <SearchBar />
        </div>
        <div className={styles.title}>
          <h3>SEARCH BY YOUR FAVORITE DIET:</h3>
        </div>
        <div className={styles.cards}>
          <div className={styles.allorden}>
            <div className={styles.filter}>
              <div className={styles.btnsdiets}>
                <button
                  className={styles.btn2}
                  value="All"
                  key="All"
                  onClick={(e) => handleDiets(e)}
                >                 
                  All
                </button>
                {diets.map((d) => (
                  <button
                    className={styles.btn2}
                    value={d.name}
                    key={d.name}
                    onClick={(e) => handleDiets(e)}
                  >                    
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.title}>
              <h3>ORDER :</h3>
            </div>
            <div className={styles.btnsorder}>
              <button
                className={styles.btn2}
                value="asc"
                key="asc"
                onClick={(e) => handleOrderByName(e)}
              >
                A-Z
              </button>
              <button
                className={styles.btn2}
                value="desc"
                key="desc"
                onClick={(e) => handleOrderByName(e)}
              >
                Z-A
              </button>

              <button
                className={styles.btn2}
                value="high"
                key="high"
                onClick={(e) => handleOrderByScore(e)}
              >               
                High score
              </button>
              <button
                className={styles.btn2}
                value="low"
                key="low"
                onClick={(e) => handleOrderByScore(e)}
              >                
                Low score
              </button>
            </div>
          </div>

          <div className={styles.pagination}>
            <Pagination
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes.length}
              paginado={paginado}
            />
          </div>
          <div className={styles.gridy}>
            <Cards recipes={currentRecipes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
