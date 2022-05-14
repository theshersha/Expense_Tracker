import { Fragment, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { Link } from 'react-router-dom';



import classes from './Header.module.css';

const Header = (props) => {
  const ctx = useContext(AuthContext);

  const logoutHandler=()=>{
    ctx.logout();
  }
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Expense Tracker</h1>
        <div className={classes.btnflex}>
          <Link to="/welcome"><button className={classes.Btn}>Home</button></Link>
          <Link to='/addexpense'><button className={classes.Btn}>Add Expense</button></Link>
          
          {ctx.isLoggedIn && <button className={classes.Btn} onClick={logoutHandler}>Logout</button> }
          {!ctx.isLoggedIn && <Link to="/login"><button className={classes.Btn}>LogIn</button></Link> }
          
        </div>
        
        
      </header>
      
    </Fragment>
  );
};

export default Header;