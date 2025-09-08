import './FaceRecognition.css'

const FaceRecognition = ({imgUrl, boxes}) => {


console.log('face recognition', boxes)

    return(
    <>
    <div className="center w50">
        <img id="faceRecognitionId" className="face-recognition-img" alt="" src={imgUrl}></img>
        {
            
            boxes.map((box) => (
                
                                <div  key={box} className='bounding-box' style={{
                                            top: box.topRow,
                                            right: box.rightCol,
                                            bottom: box.bottomRow,
                                            left: box.leftCol
                                        }}></div>
                                ))
        }
        
    </div>
    </>
)
}


export default FaceRecognition;