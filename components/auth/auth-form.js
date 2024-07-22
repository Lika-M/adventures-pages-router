import { useState } from 'react';
import { useRouter } from 'next/router.js';
import { signIn } from 'next-auth/react';

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

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMessage(state => ({
                ...state,
                email: 'Enter a valid email address.'
            }));
            return;
        }

        if (!password || password.trim().length < 6) {
            setErrorMessage(state => ({
                ...state,
                password: 'Password must be at least 6 characters long.'
            }));
            return;
        }

        const user = {
            email,
            password,
            createdAt: new Date().toISOString()
        };

        setIsLoading(true);


        if (isLogin) {
            try {
                const sign = await signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false
                });

                if (sign.error) {
                    throw new Error(sign.error)
                }

                if (!sign.error) {
                    router.replace('/adventures');
                }
            } catch (error) {
                //TODO add modal
                alert(error.message);
            }

        } else {
            try {
                await createUser(user);
                router.replace('/adventures');

            } catch (error) {
                if (error.message === 'User registration failed.') {
                    console.log(error.message);
                    // router.replace('/auth/error');
                    // something went wrong message
                }

                alert(error.message);
            }
        }

        setIsLoading(false);
        setEmail('');
        setPassword('');
    }

    function toggleAction() {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setErrorMessage({ email: '', password: '' });
    }

    function handleEmailFocus() {
        setEmail('');
        setErrorMessage(state => ({ ...state, email: '' }));
    }

    function handlePasswordFocus() {
        setPassword('');
        setErrorMessage(state => ({ ...state, password: '' }));
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
                        onFocus={handleEmailFocus}
                    />
                    {errorMessage.email && <p className={classes.error}>{errorMessage.email}</p>}
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Enter your password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={handlePasswordFocus}
                    />
                    {errorMessage.password && <p className={classes.error}>{errorMessage.password}</p>}
                </div>
                <div className={classes.actions}>
                    <button type='submit' disabled={isLoading}>
                        {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
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
