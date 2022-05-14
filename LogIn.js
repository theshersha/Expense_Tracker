import './SignUp.css';
import { useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';

const LogIn = () =>{
    const history = useHistory();
    const [isLogingIn,setIsLogingIn]=useState(false);
    const emailInputRef=useRef();
    const PasswordInputRef=useRef();

    const LogInOnSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = PasswordInputRef.current.value;
        console.log(enteredEmail,enteredPassword);
        setIsLogingIn(true);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVSmCo23_eHsGhRJwFquLRr_rzzaIAewU',{
            method: "POST",
            body: JSON.stringify({
              email:enteredEmail,
              password:enteredPassword,
              returnSecureToken:true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res)=>{
              if(res.ok){
                  setIsLogingIn(false);
                  return res.json().then((data)=>{
                      console.log(data);
                      history.replace('./addexpense');
                  })
              }
              else{
                  
                  return res.json().then((data)=>{
                      alert(data.error.message);
                      setIsLogingIn(false);
                  });
              };
          });

    };
    return (
        <section className="section">
      <div className="signupFrm">
        <div className="wrapper">
          
            <form className="form" onSubmit={LogInOnSubmitHandler}>
              <h1 className="title">Log In</h1>
              <div className="inputContainer">
                <input
                  type="text"
                  className="input"
                  placeholder="a"
                  ref={emailInputRef}
                  required
                ></input>
                <label htmlFor="" className="label">
                  Email
                </label>
              </div>

              <div className="inputContainer">
                <input
                  type="password"
                  className="input"
                  placeholder="a"
                  ref={PasswordInputRef}
                  required
                ></input>
                <label htmlFor="" className="label">
                  Password
                </label>
              </div>

              
              {isLogingIn && <p>Loging In....</p>}
              {!isLogingIn && (
                <input
                  type="submit"
                  className="submitBtn"
                  value="LogIn"
                ></input>
              )}

              <hr></hr>
              <div>Don't have an Account?</div>
              <div> Click Here...</div>
            </form>
         
        
        </div>
      </div>
    </section>
        
    );

};

export default LogIn;