import React, { useState } from 'react'

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className='auth-container'>
        <form>
            <h2>Login</h2>
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
                type="text" 
                id="password"
                value={password} 
                onChange={(event) => setPassword(event.target.value)}/>
            </div>

            <button type="submit">Login</button>
        </form>
      
    </div>
  )
}

export default Login