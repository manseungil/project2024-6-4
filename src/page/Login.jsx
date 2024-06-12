import React from 'react'
import Header from '../component/Header/Header'
import LoginForm from '../component/Login/LoginForm'

const Login = () => {
    return (
        <>
            <Header />
            <div className='container'>
                <LoginForm />
            </div>
        </>
    )
}

export default Login