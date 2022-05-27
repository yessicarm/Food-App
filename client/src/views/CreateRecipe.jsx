import React,  { useRef }from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe, getDiets } from "../redux/actions";
import { useEffect } from "react";
import style from "./ccs/create.module.css";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export const CreateRecipe = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const [errors, setError] = useState({});
  const refInputFile = useRef(null);



  const [progress, setProgress] = useState(0);
  const[isCheked, setIsCheked]= useState(false);
  const [input, setInput] = useState({
    name: "",
    image:"",
    summary: "",
    pricePerServing: 0,
    healthScore: 0,
    steps: "",
    diets: [],
  });
  console.log(input, "soy input")

  useEffect(() => {
    dispatch(getDiets());
  }, []);



  const handlerFile = (e) => {
    //le paso el file cargado desde la compu al hook de firebase
    const file = e.target.files[0];
    uploadImage(file);
    console.log(file, "soy file");
  };

  //hook firebase to upload image
  const uploadImage = (file) => {
    // references
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log(percentage, "porcentaje");
        let por = Math.round(percentage);
        console.log(por, "por ");
        setProgress(por);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await getDownloadURL(storageRef);
        //firebase link is uploaded to input
        setInput({
          ...input,
          image: url,
        });
      }
    );
  };

  const deletePhoto = (artwork) => {
    if(isCheked === true){
      setIsCheked(false)
      setInput({
        ...input,
        image:""
      });
    }
    setInput({
      ...input,
      image:""
    });    
  };


  //function that opens the computer box
  const selectImage = (e) => {
    refInputFile.current.click();
  };

  function handleCheck(e) { 
    if(isCheked === false){
      setInput({
        ...input,
        image:e.target.value,
      });
      setIsCheked(true)      
    }else{
      setInput({
        ...input,
        image:"",
      });
      setIsCheked(false)
    }   

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
    } else if (!input.pricePerServing) {
      errors.pricePerServing = "The price per serving is required";
    } else if (input.healthScore > 100) {
      errors.healthScore = "The healt has to be lower than 100";
    }
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(input);
    dispatch(postNewRecipe(input));
    alert("Goood! New recipe create");
    setInput({
      name: "",
      image:"",
      summary: "",
      pricePerServing: 0,
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

           {/* carga de imagen  */}

           <div className="photoContainer">

           <div className="techniques-box">
                    
                      <label>
                        <input
                          type="checkbox"
                          checked= {isCheked}
                          id="defaultImage"
                          name="defaultImage"
                          value="https://cdn.pixabay.com/photo/2015/08/25/03/50/herbs-906140_960_720.jpg"
                          onChange={(e) => handleCheck(e)}
                        />
                        Default image 
                      </label>
                    
                  </div>


                      {input.image.length > 0 ? (
                        <div>
                           <img
                            className="img"
                            src={input.image}
                            alt="photoRecipeNew"
                            key="photoRecipeNew"
                            width="400px"                          />
                            <p onClick={() => deletePhoto(input.image)}>X</p>
                       
                       </div>
                      ) : (
                        <div>
                          <img
                            className="img"
                            src="https://awantraining.com/wp-content/plugins/tutor/assets/images/placeholder.jpg"
                            alt="1"
                            key="aja"
                          />                          
                        </div>
                      )}
                    </div>                   


            {progress === 0 || progress === 100 ? (
                  <></>
                ) : (
                  ` Uploading... ${progress} %`
                )}

<div>
                    <p className="select" onClick={selectImage}>
                      
                      select image
                    </p>
                  </div>
                  <div className="file-uploader">
                    <input
                      type="file"
                      key="file"
                      accept=".png, .jpg, .jpeg"
                      ref={refInputFile}
                      value={input.file}
                      onChange={handlerFile}
                    />
                  </div>




  {/* carga de imagen  */}
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
                <label>Price per serving:</label>
                <input
                  type="number"
                  required
                  key="pricePerServing"
                  id="pricePerServing"
                  min="10"
                  value={input.pricePerServing}
                  name="pricePerServing"
                  onChange={(e) => handleChange(e)}
                /> usd
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
