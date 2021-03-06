import React, {useState, useEffect} from 'react';
import './App.css';
const URL = "https://dog.ceo/api/";

function Dogs({dogs,loadDogs}){
  if (loadDogs){
    return (
      <h2>Cargando</h2>
    );
  }
  return (<>
    {dogs.map((imgDog,idx) => {
      return (
        <div className="img__container" key={idx}>
          <img src={imgDog} alt="dog"/>
        </div>
      )
    })}
    </>
  );
}

function App() {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDoogs] = useState([]);
  const [loadDogs, setLoadDogs] = useState(false);

  useEffect(()=>{
    const getBreeds = async () => {
      const response = await fetch(`${URL}breeds/list/all`);
      const data = await response.json();
      const responseDogs = await fetch(`${URL}breeds/image/random/10`);
      const dataDogs = await responseDogs.json();
      setBreeds(Object.keys(data.message));
      setDoogs(dataDogs.message);
      setLoadDogs(true);
    }
    getBreeds();
  },[]);

  async function handleSelect(e){
    const breed = e.target.value;
    setLoadDogs(true);
    const respone = await fetch(`${URL}breed/${breed}/images`)
    const dogsImg = await respone.json();
    setLoadDogs(false);
    setDoogs(dogsImg.message)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Find a Dog</h1>
        <select onChange={(e)=>{handleSelect(e)}}>
          <option value="">Select a Breed</option>
          {breeds.map((breed,idx) => {
            return (<option value={breed} key={idx}>{breed}</option>)
          })}
        </select>
        <div className="container">
          <Dogs dogs={dogs} loadDogs={loadDogs}/>
        </div>
      </header>
    </div>
  );
}

export default App;
