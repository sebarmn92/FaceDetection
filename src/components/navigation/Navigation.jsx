import './Navigation.css'

const Navigation = ({onRouteChange, isSignedIn, route}) => {


    const onSignOut = () => {
        window.sessionStorage.removeItem('token')
        onRouteChange('signin')
    }

    return (
        
        isSignedIn === true ?        
            <nav className="navbar">
                <p onClick = {onSignOut} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        
        :
            route == 'signin' ?
            <nav className="navbar">         
                <p onClick = {() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
            :
            <nav className="navbar">               
                <p onClick = {() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
            </nav>        
    )
}


export default Navigation;