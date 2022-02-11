import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../redux/actions";
import styles from './styles/searchbar.module.css'
import { getRecipes } from "../redux/actions";
import RecipesDb from '../components/RecipesDb'
import { Link } from "react-router-dom";



export default function SearchBar(){

    const dispatch= useDispatch()
    const [name, setName] = useState("")


function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipe(name))
        setName("")
        
        
        }

function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
        
    }



function handleAllRecipes(e) {    //le paso el evento..
    e.preventDefault()
    dispatch(getRecipes())   //resetea las recipes
  }

  


return(

    <div className={styles.container}>
        

        <div className={styles.search_box}>
        <div className={styles.searchcontent}>
        <input
        className={styles.input}
        type= "text"
        placeholder="Search recipes..."
        onChange={(e)=> handleInputChange(e)}
        />
        <button className={styles.btn} type="submit" onClick={(e)=>handleSubmit(e)}>SEARCH</button>
        </div>

        <div className={styles.btnrecipes}>
               <div> <button  className={styles.btn} onClick={e => { handleAllRecipes(e) }}> ALL RECIPES </button> </div>                           
               <div><RecipesDb/>   </div>           
                
               <div> <Link to='/recipe'>
                    <button className={styles.btn}>ADD NEW RECIPE</button>
                    </Link> </div>
                
          </div>
          </div>
        
        

          
           
    
                    
  
  </div>




)


}