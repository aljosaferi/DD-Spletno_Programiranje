import Button from '../../Button/Button';

import styles from './Register.module.scss';

interface RegisterProps {
    handleClose: () => void;
}

function Register({ handleClose }, RegisterProps) {
    return (
        <div className={styles['container']}>
            <form>
                <div className={styles['name-container']}>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ime"
                        required
                    />
                    <input
                        type="text"
                        id="surname"
                        placeholder="Priimek"
                        required
                    />
                </div>
                <div className={styles['username-container']}>
                    <input
                        type="text"
                        id="username"
                        placeholder="Uporabniško ime"
                        required
                    />
                </div>
                <div className={styles['email-container']}>
                    <input
                        type="email"
                        id="email"
                        placeholder="elektronska pošta"
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
                <div className={styles['restaurant-owner-container']}>
                    Lastnik Restavracije:
                    <label className={styles['switch']}>
                        <input type="checkbox" />
                        <span className={`${styles['slider']} ${styles['round']}`}/>
                    </label>
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

export default Register;