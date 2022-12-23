import React, { useState } from "react";
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
	const [message, setMessage] = useState("");
    const [formAuthLogin, setFormAuthLogin] = useState({
		email: "",
		password: "",
	});

    const changeTextInput = (event) => {
		setFormAuthLogin({
			...formAuthLogin,
			[event.target.name]: event.target.value,
		});
	};

    const submitFormLogin = (event) => {
        event.preventDefault();
		const { email, password } = formAuthLogin;
		const setDataFormLogin = { email, password };

        for (const value in setDataFormLogin) {
			if (setDataFormLogin[value] === "") {
                toast.error("Lengkapi form yang kosong.");
				return false;
			}
		}

        if (formAuthLogin.email === "admin@gmail.com" && formAuthLogin.password === "12345678") {
            return navigate("/dashboard");
        }  else {
            setError(true);
            setMessage("Email : admin@gmail.com, password : 12345678");
            
            setTimeout(() => {
                setError(false);
                setMessage("");
            }, 5000);
            return false;
        }
    }
    
	return (
		<>
            <ToastContainer toastClassName="bg-white" position="top-right" autoClose={5000} />

			<div className="container">
                <div className="form-box">
                    <div className="header-form">
                        <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{fontSize:"110px"}}></i></h4>
                        <div className="image">
                        </div>
                    </div>
                    <div className="body-form">
                        <form onSubmit={submitFormLogin}>
                            <div className="input-group mb-3">
                                <input 
                                	name="email"
                                    type="email" 
                                    className="form-control" 
                                    placeholder="email" 
                                    value={formAuthLogin.email}
									onChange={changeTextInput}       
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    name="password"
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                    value={formAuthLogin.password} 
                                    onChange={changeTextInput}       
                                    />
                            </div>
                            <button type="submit" className="btn btn-secondary btn-block" style={{width: "100%"}}>LOGIN</button>
                        </form>
                        {
                            error && (
                                <p className="text-center mb-2 mt-2" style={{color: "red"}}>{message}</p>
                            )
                        }

                        <div className="social">
                            <a href="#"><h1><BsFacebook /></h1></a>
                            <a href="#"><h1><BsGoogle /></h1></a>
                        </div>
                    </div>
                </div>
            </div>
		</>
	);
}
