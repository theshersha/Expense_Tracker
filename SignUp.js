import "./SignUp.css";
import { useRef, useState } from "react";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const emailInputRef = useRef();
  const PasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const codeInputRef=useRef();
  const signUpOnSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (
      PasswordInputRef.current.value === confirmPasswordInputRef.current.value
    ) {
      console.log("match");

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBawf_72sdwcoLf6_ToLskojR4Pxp0WC0I",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: PasswordInputRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          setIsLoading(false);
          return res.json().then((data) => {
            setIsConfirm(true);
            const id = data.idToken;
            fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBawf_72sdwcoLf6_ToLskojR4Pxp0WC0I",
              {
                method: "POST",
                body: JSON.stringify({
                  requestType: "VERIFY_EMAIL",
                  idToken: id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            ).then((res) => {
              if (res.ok) {
                  return res.json().then((data)=>{
                      setIsConfirm(false);
                      console.log(data);
                  })
                // setIsConfirm(false);
                // fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBawf_72sdwcoLf6_ToLskojR4Pxp0WC0I',{
                //     method: "POST",
                //     body: JSON.stringify({
                //       requestType: "VERIFY_EMAIL",
                //       idToken: id,
                //     }),
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //   })
              } else {
                return res.json().then((data) => {
                  if (data && data.error && data.error.message) {
                    alert(data.error.message);
                    setIsConfirm(false);
                  }
                });
              }
            });
          });
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              alert(data.error.message);
              setIsLoading(false);
            }
          });
        }
      });
    }

    //       .then((res)=>{
    //           if(res.ok){

    //           }
    //           else{
    //             return res.json().then((data) => {

    //                 if (data && data.error && data.error.message) {
    //                   alert(data.error.message);
    //                 }
    //           }
    //       )}
    // })};

    emailInputRef.current.value = "";
    PasswordInputRef.current.value = "";
    confirmPasswordInputRef.current.value = "";
  };
  //const onCodeSubmitHandler =(event)=>{
    //   const enteredCode = codeInputRef.current.value;
    //   fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBawf_72sdwcoLf6_ToLskojR4Pxp0WC0I', {
    //     method: "POST",
    //     body: JSON.stringify({
    //       oobCode:enteredCode,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((res)=>{
    //       if (res.ok){
    //           return res.json().then((data)=>{
    //               console.log(data);
    //               if(data.emailVerified){
    //                   isConfirm(false);
    //               }
    //           })

    //       }
    //       else{
    //           return res.json().then((data)=>{
    //               console.log(data.error.message);
    //           })
    //       }
    //   })


  //};
  return (
    <section className="section">
      <div className="signupFrm">
        {/* <div className="wrapper"> */}
          
            <form className="form" onSubmit={signUpOnSubmitHandler}>
              <h1 className="title">Sign up</h1>
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

              <div className="inputContainer">
                <input
                  type="password"
                  className="input"
                  placeholder="a"
                  ref={confirmPasswordInputRef}
                  required
                ></input>
                <label htmlFor="" className="label">
                  Confirm Password
                </label>
              </div>
              {isLoading && <p>Signing Up....</p>}
              {!isLoading && (
                <input
                  type="submit"
                  className="submitBtn"
                  value="Sign up"
                ></input>
              )}

              <hr></hr>
              <div>Already have an Account?</div>
              <div> Click Here...</div>
            </form>
          
          {/* {isConfirm && (
            <div className="form">
              <div className="confirmemailtitle">Enter Code sent on Email</div>
              <div className="inputContainer">
                <input
                  type="text"
                  className="input"
                  placeholder="a"
                  ref={codeInputRef}
                  required
                ></input>
                <label htmlFor="" className="label">
                  Enter Code
                </label>
              </div>
              <input
                  type="submit"
                  className="submitBtn"
                  value="Submit"
                  onClick={onCodeSubmitHandler}
                ></input>
            </div>
          )} */}
        </div>
      {/* </div> */}
    </section>
  );
};

export default SignUpForm;
