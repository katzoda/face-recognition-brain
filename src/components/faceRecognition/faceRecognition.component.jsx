
import './faceRecognition.styles.css';

const FaceRecognition = ({ imageURL, faceBox }) => {
    if (imageURL !== '') {
        return (
            <div className="image-recognition-container">
                <div className="image-recognition">
                    <img id="inputimage" alt="faces" src={imageURL} width={'500px'} height={'auto'} />
                    <div className='bounding-box'
                        style={{
                            top: faceBox.topRow,
                            right: faceBox.rightCol,
                            bottom: faceBox.bottomRow,
                            left: faceBox.leftCol
                        }}></div>
                </div>
            </div>
        );
    }
}
export default FaceRecognition;