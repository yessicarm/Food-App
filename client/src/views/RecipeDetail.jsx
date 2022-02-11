import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeDetail, clearRecipesDetail } from "../redux/actions";
import styles from "./ccs/recipedetail.module.css";
import { Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.recipeDetails);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return () => {
      dispatch(clearRecipesDetail());
    };
  }, [dispatch, id]);
  return (
    <div className={styles.principal}>
      {recipe && (
        <>
          <div className={styles.image}>
            <div>
              <Link to="/home">
                <button className={styles.btn}> BACK TO HOME</button>
              </Link>
            </div>
            <img src={recipe.image} alt={recipe.name} />
            <h3>Types of Dish: </h3>
            <h5>
              {Array.isArray(recipe.dishTypes)
                ? recipe.dishTypes.map((el) => (
                    <button className={styles.btntypes}>{el.name}</button>
                  ))
                : recipe.dishTypes}
            </h5>
            <h3>Types of Diet: </h3>
            {recipe?.diets?.map((el) => (
              <button className={styles.btndiets}>{el.name}</button>
            ))}
          </div>

          <div className={styles.text}>
            <h1>{recipe.name}</h1>
            <div className={styles.scores}>
              <div>
                <h3>Score: </h3>{" "}
                <button className={styles.btnscore}> {recipe.score}</button>
              </div>

              <div>
                <h3>Health Score:</h3>{" "}
                <button className={styles.btnscore}>
                  {" "}
                  {recipe.healthScore}{" "}
                </button>
              </div>
            </div>
            <div className={styles.summary}>
              <h3>Summary:</h3>
              <ol>
                <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
              </ol>
            </div>
            <div className={styles.steps}>
              <h3>Steps:</h3>
              <ol>
                {Array.isArray(recipe.steps)
                  ? recipe.steps.map((e) =>
                      e.steps.map((f) => {
                        return <li> {f.step}</li>;
                      })
                    )
                  : recipe.steps}
              </ol>
            </div>
          </div>
        </>
      )}
      {!recipe && <h1>Loading...</h1>}
    </div>
  );
};

export default RecipeDetail;
