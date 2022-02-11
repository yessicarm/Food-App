import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe, getDiets } from "../redux/actions";
import { useEffect } from "react";
import style from "./ccs/create.module.css";

export const CreateRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [errors, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    score: 0,
    healthScore: 0,
    steps: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  function validate(input) {
    //por fuera
    let errors = {};
    if (!input.name) {
      errors.name = "The name of recipe is required";
      // } else if (/^\s*$/.test(input.name)) {
      //     errors.name = 'Name is invalid , no accept special characters';
    } else if (!input.steps) {
      errors.steps = "The steps are required";
    } else if (!input.summary) {
      errors.summary = "Summary is required";
    } else if (!input.diets) {
      errors.diets = "Diets is required";
    } else if (diets.indexOf(input.diets)) {
      errors.diets = "Diets is required";
    } else if (input.score > 100) {
      errors.score = "The score has to be lower than 100";
    } else if (input.healthScore > 100) {
      errors.healthScore = "The healt has to be lower than 100";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value, //va tomando el nombre de cada prop, me vaya llenando el estado
    });
    setError(
      //form
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,

        diets: [...input.diets, e.target.value],
      });
    }
  }

  function HandleDelete(el) {
    setInput({
      ...input,
      diets: input.diets.filter((d) => d !== el),
    });
  }

  console.log(input.diets);
  console.log(input.validate);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postNewRecipe(input));
    alert("Goood! New recipe create");
    setInput({
      name: "",
      summary: "",
      score: 0,
      healthScore: 0,
      steps: "",
      diets: [],
    });
    history.push("/home");
  }
  //---------------------

  return (
    <div className={style.principal}>
      <div className={style.container}>
        <Link to="/home">
          <button className={style.btn}>GO TO HOME</button>
        </Link>
        <h1>CREATE A NEW RECIPE</h1>
        <form key="form" onSubmit={(e) => handleSubmit(e)}>
          <div className={style.diets}>
            <div>
              <label>Recipe name:</label>
              <input
                type="text"
                autoComplete="off"
                key="name"
                className={style.inputname}
                required
                value={input.name}
                name="name"
                onChange={handleChange}
              />
              <div>{errors.name ? <p>{errors.name}</p> : <p></p>} </div>
            </div>

            <label>Diets:</label>

            <div>
              <select
                className={style.select}
                key="diets"
                required
                onChange={(e) => handleSelect(e)}
              >
                {diets.map((d) => (
                  <option value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              {input.diets.map((el) => (
                <button
                  className={style.dietbutton}
                  key={el}
                  onClick={() => HandleDelete(el)}
                >
                  {" "}
                  {el} X{" "}
                </button>
              ))}
            </div>
            <div>{errors.diets ? <p>{errors.diets}</p> : <p></p>} </div>

            <div>
              <label>Summary: </label>
              <input
                type="textarea"
                key="summary"
                className={style.textarea}
                required
                value={input.summary}
                name="summary"
                onChange={handleChange}
              />
              <div>{errors.summary ? <p>{errors.summary}</p> : <p></p>} </div>
            </div>
            <div className={style.scores}>
              <div>
                <label>Score: (50-100)</label>
                <input
                  type="number"
                  required
                  key="score"
                  id="Score"
                  min="50"
                  max="100"
                  value={input.score}
                  name="score"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Health Score: (50-100)</label>
                <input
                  type="number"
                  required
                  key="health"
                  id="healthScore"
                  min="60"
                  max="100"
                  value={input.healthScore}
                  name="healthScore"
                  onChange={(e) => handleChange(e)}
                />

                <div>
                  {errors.healthScore ? <p>{errors.healthScore}</p> : <p></p>}{" "}
                </div>
              </div>
            </div>
            <div>
              <label>Steps:</label>
              <input
                type="textarea"
                required
                key="steps"
                className={style.textarea}
                value={input.steps}
                name="steps"
                onChange={handleChange}
              />
              <div>{errors.steps ? <p>{errors.steps}</p> : <p></p>} </div>
            </div>
          </div>
          <button className={style.btn}>Create New Recipe</button>
        </form>
      </div>
    </div>
  );
};
