import './Navigation.css'

const Navigation = ({onRouteChange, isSignedIn}) => {


    return (
        
        isSignedIn === true ?
        
            <nav className="navbar">
                <p onClick = {() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        
        :
            <nav className="navbar">
                <p onClick = {() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
                <p onClick = {() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        
    )
}


export default Navigation;