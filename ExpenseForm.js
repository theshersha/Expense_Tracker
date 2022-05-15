import "./ExpenseForm.css";
import {useState} from 'react';

const ExpenseForm = (props) => {

    const [enteredTitle,setEnteredTitle] = useState('');
    const [enteredAmount,setEnteredAmount] = useState('');
    const [enteredDate,setEnteredDate] = useState('');
    const [enteredLocation,setEnteredLocation] = useState('');
    
    const submitHandler = (event)=>{
        event.preventDefault();
        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate),
            location: enteredLocation
        };
        props.onSaveExpenseData(expenseData);

        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
        setEnteredLocation('');
        
    }

    const titleHandler = (event)=>{
        setEnteredTitle(event.target.value);
        
    }

    const amountHandler = (event)=>{
        setEnteredAmount(event.target.value);
       
    }

    const dateHandler = (event)=>{
        setEnteredDate(event.target.value);
       
    }
    
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={titleHandler} />
         
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" value={enteredAmount} min="0.01" step="0.01" onChange={amountHandler} />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" value={enteredDate} min="2019-01-01" max="2023-12-31" onChange={dateHandler} />
        </div>
       
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
        <button type="submit" onClick={props.onStop}>Cancel</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
