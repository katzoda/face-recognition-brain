import './imageLinkForm.styles.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="image-link-form-container">
            <p>
                {'This Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='input-button-container'>
                <input onChange={onInputChange} className='input-form' type="text" />
                <button onClick={onButtonSubmit} className='detect-button'>Detect</button>
            </div>
        </div>
    );

}
export default ImageLinkForm;