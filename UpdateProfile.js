import "./UpdateProfile.css";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import { useRef,useState } from "react";



const UpdateProfile = () => {
  const ctx = useContext(AuthContext);
  const nameInputRef = useRef();
  const imgUrlInputRef = useRef();
  const [isUpdating,setIsUpdating] = useState(false);
  const onUpdateProfileHandler =(event)=>{
    event.preventDefault();
    const entereName = nameInputRef.current.value;
    const enteredImgUrl = imgUrlInputRef.current.value;
    const tokentoupdate = ctx.token;
    setIsUpdating(true);
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBawf_72sdwcoLf6_ToLskojR4Pxp0WC0I',{
      method: "POST",
      body: JSON.stringify({
        idToken:tokentoupdate,
        displayName:entereName,
        photoUrl:enteredImgUrl,
        returnSecureToken: false
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      if(res.ok){
        setIsUpdating(false);
        return res.json().then((data)=>{
          console.log(data);
        })

      }else{
        return res.json().then((data) => {
          alert(data.error.message);
          setIsUpdating(false);
      
        });

      }
    })
    
  
  }
 
  return (
    <section className="section">
      <div className="signupFrm">
        
          <form className="form" onSubmit={onUpdateProfileHandler}>
            <h1 className="title">Update Profile</h1>
            <div className="inputContainer">
              <input
                type="text"
                className="input"
                placeholder="a"
                ref={nameInputRef}
                required
              ></input>
              <label htmlFor="" className="label">
                Name
              </label>
            </div>

            <div className="inputContainer">
              <input type="text" className="input" placeholder="a" ref={imgUrlInputRef}></input>
              <label htmlFor="" className="label">
                Image URL
              </label>
            </div>
            {isUpdating && <p>Updating...</p>}
            {!isUpdating && <input type="submit" className="submitBtn" value="Submit" ></input>}

            
          </form>
        </div>
     
    </section>
  );
};

export default UpdateProfile;
