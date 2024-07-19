import { useRef, useState } from 'react';

import { createUser } from '@/db-lib/util.js';
import classes from './auth-form.module.css';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    const inputEmail = useRef();
    const inputPassword = useRef();

    async function signHandler(event) {
        event.preventDefault();

        const user = {
            email: inputEmail.current.value,
            password: inputPassword.current.value,
            createdAt: new Date().toISOString()
        }

        if (!isLogin) {
            try {
                const result = await createUser(user);
            } catch (error) {
                alert(error.message);
            }
        } else {
            console.log('login')
        }
    }

    function toggleAction() {
        setIsLogin(!isLogin)
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={signHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Enter your email</label>
                    <input type='email' id='email' required ref={inputEmail} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Enter your password</label>
                    <input type='password' id='password' required ref={inputPassword} />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                </div>
                <div className={classes.toggle}>
                    <span>{isLogin ? 'Not have an account?' : 'Already have an account?'}</span>
                    <span onClick={toggleAction}> {isLogin ? 'Register here.' : 'Login here.'}
                    </span>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
