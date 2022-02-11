import React from "react";
import styles from './Pagination.module.css'


export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumber=[] // arreglo de numeros 


    for(let i=1; i<= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i)
    }

    if(allRecipes>9){
    return(

        <div>
           
            <div className={styles.paginado}>
                {pageNumber && pageNumber.map(number=>(
                        
                        
                        <button className={styles.btnpage} onClick={()=>paginado(number)}>{number}</button>
                        
                        
                     ) )
                }
            </div>
            </div>
    )
    }else if (allRecipes <= 9){
        return(
            <div></div>
        )
    }
}