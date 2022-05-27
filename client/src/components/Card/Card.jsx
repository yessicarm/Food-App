import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ name, image, id, healthScore, diets }) => {
  return (
    <>
      <div className={styles.card} key={id}>
        <h3>{name}</h3>
        <Link to={`/recipes/${id}`}>
          <img className={styles.image} src={image} alt={name} />
        </Link>
        <div className={styles.text}>
          <h3>health Score:</h3>
          <button className={styles.btnscore}>{healthScore}</button>
          <h3>Types of Diets:</h3>

          {diets?.map((el) => (
            <button className={styles.btn}> {el.name} </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
