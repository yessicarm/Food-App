
import { getRecipesDb } from "../redux/actions";
import { useDispatch } from "react-redux";
import styles from './styles/recipesdb.module.css'


export default function RecipesDb(){
    const dispatch = useDispatch()

    function handleRecipesDb(e) {    //le paso el evento..
        e.preventDefault()
        dispatch(getRecipesDb())   //resetea las recipes EN DB 
      }

    return(
        <div>
             <button  className={styles.btn}
                onClick={e => { handleRecipesDb(e) }}>
                NEWS RECIPES 
            </button>

        </div>




    )
}

