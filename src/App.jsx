import { useState, useRef, useEffect } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

const PAT = 'c202b98b870747779bb281dee2f392e6';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


function App() {
  const ref = useRef('');
  const [imgUrl, setImgUrl] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [userData, setUserData] = useState(null);
  
  useEffect( () =>{
    const token = window.sessionStorage.getItem('token')
    if(token){
      fetch("http://localhost:3000/signin", {
        method: 'post',
        headers: {
          'Content-Type':'application/json',
          // 'Authorization' : 'Bearer ' + token   -> research Bearer
          'Authorization' : token
        }
      }).then( (data) => {
        if(data.status === 200){
            data.json().then(result =>{
                onRouteChange('home', result)
            })    
        }
        else{
            data.json().then(alert)
        }
      }) 
    }
  }, [])

  useEffect( () => {
    if(imgUrl !== null){
      setBoxes([])
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

      fetch("http://localhost:3000/entries", {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            "id": userData.id
          })
      }).then((res) => {
        if(res.status === 200){
          res.json().then((data) => {
            setUserData({
              id : userData.id,
              name : userData.name,
              email : userData.email,
              entries : data,
              joined: userData.joined
            })
          })
        }
        else{
          res.json().then(alert)
        }     
      })

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

const onRouteChange = (route, data) => {
  if(route === 'signout'){
    setUserData(null);
  }
  else if(route === 'home'){
    setImgUrl(null);
    setBoxes([]);
    setUserData(data);
  }

  setRoute(route);
};
  return (
    <div className='App'>
      <Navigation onRouteChange={onRouteChange} isSignedIn = {userData?.id !== undefined ? true : false} />
      {
        route === 'signin' ?
        <Signin onRouteChange={onRouteChange}/>
        : (
          route === 'home' ?
            <>
              <Logo/>
              <Rank name={userData?.name} entries={userData?.entries}/>
              <ImageLinkForm onInputChange = {onInputChange} onSubmit = {onSubmit}/>      
              <FaceRecognition imgUrl = {imgUrl} boxes = {boxes}/> 
            </>
            :
            <Register onRouteChange={onRouteChange}/>
        )

       } 
    </div>
  )
}

export default App
