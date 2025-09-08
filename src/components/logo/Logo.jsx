import './Logo.css'
import Tilt from 'react-parallax-tilt';
import logo from './face-detection.png'

const Logo = () => {

    return(
      <div className = 'ma4 mt0'>
        <Tilt style={{width: 'fit-content', height: 'fit-content'}}>
          <div className='logo'>
            <img alt='logo' className='logo-img' src = {logo}></img>
          </div>
        </Tilt>
      </div>
    )
}

export default Logo;