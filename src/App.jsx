import { useState, useRef, useEffect } from 'react'
import './App.css'
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import Rank from './components/rank/Rank'


const PAT = 'c202b98b870747779bb281dee2f392e6';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


function App() {
  const ref = useRef('');
  const [imgUrl, setImgUrl] = useState(null);
  
  useEffect( () => {
    if(imgUrl !== null){
      fetch("http://localhost:3000/detectface", {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            "imgurl": imgUrl
          })
      })
      .then(response => response?.json())
      .then(result => {
        console.log("frontend ", result);
      }).catch(e => {
        console.log(e);
      })
    }
  }, [imgUrl]);

  

  const onInputChange = (event) =>{
    if(event.target.value === '' ) return;

    ref.url = event.target.value;
  }

  const onSubmit = () => {

    if (ref.url === '') return;

    setImgUrl(ref.url);
}

  return (
    <div className='App'>
      <Navigation/>
      <Logo/>
      <Rank />
      <ImageLinkForm onInputChange = {onInputChange} onSubmit = {onSubmit}/>      
      <FaceRecognition/>     
    </div>
  )
}

export default App
