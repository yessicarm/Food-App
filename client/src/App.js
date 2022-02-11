import './App.css';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { getRecipes, } from './redux/actions';
import{Route, Switch} from'react-router-dom'
import Home from './views/Home';
import LandingPage from './views/LandingPage'


import {CreateRecipe} from './views/CreateRecipe';
import RecipeDetails from './views/RecipeDetail';


function App() {
  const  dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecipes())   
      }, [dispatch])
  


  return (
    <>
    
    <Switch>
    
    <Route path='/' exact component={LandingPage}/>
    <Route path='/home' exact component={Home}/>
    <Route path='/recipe' exact component={CreateRecipe}/>
    <Route path='/recipes/:id' exact component={RecipeDetails}/>
    
    </Switch>
    </>
  );
}

export default App;
