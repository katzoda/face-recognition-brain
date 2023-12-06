import './logo.styles.css';
import brain from './brain.png';


const Logo = () => {
    return (
        <div className="logo">
            <img id='logo-img' alt='logo by www.freepik.com ' src={brain} />
        </div>
    );

}
export default Logo;