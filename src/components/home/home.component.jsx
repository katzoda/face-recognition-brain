import Logo from "../logo/logo.component";
import Rank from "../rank/rank.component";
import ImageLinkForm from "../imageLinkForm/imageLinkForm.component";
import FaceRecognition from "../faceRecognition/faceRecognition.component";

const Home = ({ onInputChange, onButtonSubmit, imageURL, faceBox }) => {
    return (
        <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
            <FaceRecognition imageURL={imageURL} faceBox={faceBox} />
        </div>
    );
}
export default Home;