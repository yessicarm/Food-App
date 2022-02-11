import React from "react";
import { Link } from "react-router-dom";
import styles from './ccs/landing.module.css'

const LandingPage = ()=>{
    return(
        
        <section className={styles.grid}>
        <div className={styles.grid_texts}>
            <div className={styles.grid_welcome}>
                <h3 >Welcome</h3>
            </div>
            <div className={styles.grid_title}>            
            <h2 > EAT </h2>
            <h2>HEALTHY</h2>
            <div className={styles.subtitle}>
            <h2 >STAY </h2>
            <h2>HEALTHY</h2>
            </div>
            </div>
            <div>

            <button className={styles.btn}>
            <Link to='/home'>
                GET RECIPES
            </Link>
            </button>
        </div>
         </div>
            
        </section>
        
    )

}

export default LandingPage