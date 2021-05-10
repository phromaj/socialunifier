import Link from 'next/link'
import styles from '../../styles/forms/Register.module.scss'

export default function Register() {

    return (
        <>
            <section className={styles.form_container}>
                <section className={styles.container}>
                    <section className={styles.form_register_left}>
                        <div className={styles.form_register_left_content}>
                            <h1>Social-Unifier</h1>
                            <h3>Welcome to register page</h3>
                        </div>
                    </section>
                    <section className={styles.form_register_right}>
                        <div className={styles.form_container_right}>
                            <div className={styles.form_register_title}>
                                <h2>Register</h2>
                            </div>

                            <form action="" id={styles.form_register}>
                                <div className={styles.form_group}>
                                    <label htmlFor="#">Full name</label>
                                    <input type="text"/>
                                </div>
                                <div className={styles.form_group}>
                                    <label htmlFor="#">Email</label>
                                    <input type="text"/>
                                </div>
                                <div className={styles.form_group}>
                                    <label htmlFor="#">Password</label>
                                    <input type="text"/>
                                </div>
                                <div className={styles.form_group}>
                                    <label htmlFor="#">Confirm password</label>
                                    <input type="text"/>
                                </div>
                            </form>

                            <button type="submit" form={styles.form_register}>Create Account</button>
                            <p className={styles.exist_account}>Already have an account ?
                                <span>
                                    <Link href="#">
                                        <a>Log in</a>
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </section>
                </section>
            </section>
        </>
    )
}