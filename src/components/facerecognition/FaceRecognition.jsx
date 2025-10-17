import './FaceRecognition.css'

const FaceRecognition = ({imgUrl, boxes}) => {

    return(
    <>
    <div className='center ma'>
        <div className="center absolute mt2">
            <img id="faceRecognitionId" alt="" src={imgUrl} width='500px' heigh='auto'></img>
            {
                
                boxes.map((box) => (
                    
                                    <div  key={box.topRow} className='bounding-box' style={{
                                                top: box.topRow+'px',
                                                right: box.rightCol+'px',
                                                bottom: box.bottomRow+'px',
                                                left: box.leftCol+'px'
                                            }}></div>
                                    ))
            }
            
        </div>
    </div>
    </>
)
}


export default FaceRecognition;