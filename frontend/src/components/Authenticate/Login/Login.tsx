import Button from '../../Button/Button';

import styles from './Login.module.scss';

function Login() {
    return (
        <div className={styles['container']}>
            <form>
                <div className={styles['username-container']}>
                    <input
                        type="text"
                        id="username"
                        placeholder="Uporabniško ime"
                        required
                    />
                </div>
                <div className={styles['password-container']}>
                    <input
                        type="password"
                        id="password"
                        placeholder="Geslo"
                        required
                    />
                </div>
                <div className={styles['submit-container']}>
                    <Button type="primary" width={"100%"} padding={'1rem'}>
                        Prijavi se
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login;