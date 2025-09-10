import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    function handle(e) {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }))
    };
    function submitHandle(){
        if(user.username==="admin" && user.password==="1234"){
            localStorage.setItem("user",JSON.stringify(user))
            navigate("/admin-panel")
        }else{
            alert("Login yoki parol xato")
        }
    }


    return (
        <div className={styles.loginBody}>
            <div className={styles.box}>
                <h1>login</h1>
                <br />
                <input type="text" placeholder='name' onChange={handle} value={user.username} name='username'/>
                <br />
                <br />
                <input type="text" placeholder='password' onChange={handle} value={user.password} name='password'/>
                <br />
                <br />
                <button onClick={submitHandle}>Kirish</button>
            </div>
        </div>
    )
}

export default Login