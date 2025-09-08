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
  const [boxes, setBoxes] = useState([]);
  

  
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
        
        const image = document.getElementById('faceRecognitionId');
        const width = Number(image.width);
        const height = Number(image.height);
        let temp_boxes = [];

        result.forEach( data => {
          temp_boxes.push(
            {
              leftCol : data.leftCol * width,
              topRow : data.topRow * height,
              rightCol: width - ( data.rightCol * width),
              bottomRow: height - (data.bottomRow * height) 
            });
        });
        setBoxes(temp_boxes);
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
      <FaceRecognition imgUrl = {imgUrl} boxes = {boxes}/>     
    </div>
  )
}

export default App
