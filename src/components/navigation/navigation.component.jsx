
import './navigation.styles.css';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav className="navigation">
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
    )
}
export default Navigation;