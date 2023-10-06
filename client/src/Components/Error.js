import {Link} from 'react-router-dom';
import gif from '../assets/catlaptop.gif'
import CSS from "../CSS/error.css"

// error page
const Error = () => {
    return (
            <div className ="error-page">
                <img className = "cat-gif" src={gif} />
                <div className="page-text">
                    <p className="error">404</p>
                    <div className="text">
                        <p>Opps, we couldn't find the page you were looking for</p>
                        <p>As you can see, our staff continues to improve our website.</p>
                        <Link to='/' className="button-link">Go Back Home</Link>
                    </div>
                </div>
            </div>
        )
    };
export default Error; 