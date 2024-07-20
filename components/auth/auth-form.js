import { useState } from 'react';
import { useRouter } from 'next/router.js';

import { createUser } from '@/db-lib/util.js';
import classes from './auth-form.module.css';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });
    const router = useRouter();

    async function signHandler(event) {
        event.preventDefault();

        // TODO validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage(state => ({
                ...state,
                email: 'Enter a valid email address'
            }));
        }
        
        if (!password || password.trim().length < 6) {
            setErrorMessage(state => ({
                ...state,
                password: 'Password must be at least 6 characters long'
            }));
        }

        if (errorMessage.some(x => x === '')) {
            return;
        }

        const user = {
            email,
            password,
            createdAt: new Date().toISOString()
        }

        try {
            if (isLogin) {
                console.log('login');
                // check user credentials
                // router.replace('/adventures');
            } else {
                await createUser(user);
                router.replace('/adventures');
            }
        } catch (error) {
            //TODO add 404 page
            // router.push('/error)
        } finally {
            setIsLoading(false);
            setEmail('');
            setPassword('');
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
                    <input
                        type='email'
                        id='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Enter your password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={classes.actions}>
                    <button type='submit' disabled={isLoading}>
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                </div>
                <div className={classes.toggle}>
                    <span>
                        {isLogin ? 'Not have an account?' : 'Already have an account?'}
                    </span>
                    <span onClick={toggleAction}>
                        {isLogin ? 'Register here.' : 'Login here.'}
                    </span>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
