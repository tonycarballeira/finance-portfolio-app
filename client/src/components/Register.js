import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {

    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 

    const onSubmit = async (event) => {
        //this prevents request from refreshing the webpage
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/auth/register", { username, password });
            alert("Registration Completed! Now Login.")
        } catch (err) {
            console.error(err);
        }


    };

  return (
    <div className='auth-container'>
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            <div className='form-group'>
                <label htmlFor='username'> Username:</label>
                <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'> Password:</label>
                <input 
                type="password" 
                id="password"
                value={password} 
                onChange={(event) => setPassword(event.target.value)}/>
            </div>

            <button type="submit">Register</button>
        </form>
      
    </div>
  )
}

export default Register
