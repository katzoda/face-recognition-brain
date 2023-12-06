
import './faceRecognition.styles.css';

const FaceRecognition = ({ imageURL }) => {
    if (imageURL !== '') {
        return (
            <div>
                <div className="image-recognition">
                    <img alt="faces" src={imageURL} width={'500px'} height={'auto'} />
                </div>
            </div>
        );
    }
}
export default FaceRecognition;