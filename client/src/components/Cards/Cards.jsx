import React from "react";
import { Card } from "../Index";
import styles from './cards.module.css'


const Cards = ({recipes})=>{
    return(
        <div className={styles.cards}>
            {
                recipes?.map(recipe=>
                    <Card
                    name={ recipe.name}
                    image={ recipe.image}
                    diets={ recipe.diets}
                    score={ recipe.score}
                    id={recipe.id}                    
                    dishTypes={ recipe.dishTypes}
                    summary={recipe.summary}
                    healthScore={recipe.healthScore}
                    steps={recipe.steps}
                    />)
                    
                   
                    
            }


        </div>
    )

}

export default Cards