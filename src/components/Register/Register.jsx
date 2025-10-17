import { useState, useEffect } from 'react'

const Register = ({ onRouteChange }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onNameChange = (event) =>{
        setName(event.target.value)
    }

    const onEmailChange = (event) =>{
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) =>{
        setPassword(event.target.value)
    }

    const onSubmitRegister = () =>{
        fetch("http://localhost:3000/register", {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
            "name" : name,
            "email": email,
            "password": password
            })
        }).then( (data) => {
            
            if(data.status !== 200){
                
                data.json().then(alert)
            }
            else{
                onRouteChange('signin')
            }
        })    
    }

    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>

                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="user-name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onNameChange} type="text" name="user-name"  id="user-name" />
                    </div>

                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onEmailChange} type="email" name="email-address"  id="email-address" />
                    </div>

                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onPasswordChange} type="password" name="password"  id="password" />
                    </div>

                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick ={onSubmitRegister} type="submit" value="Register" />
                    </div>

                </div>
            </main>
        </article>
    )
}

export default Register;