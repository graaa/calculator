import './App.css';

function App(){
  const [input, setInput] = React.useState("");
  const [formulaInput, setFormulaInput] = React.useState("");
  const [operator, setOperator] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [activeOperation, setActiveOperation] = React.useState(null);
  const [pendingOperation, setPendingOperation] = React.useState(null);

  const operators = ['X','-','+','÷'];
  const addNumber = e => {
    let valueToSet = e.target.innerText; // The number that was clicked

    // Clear any active operation highlighting
    setActiveOperation(null);

    // If there's a pending operation, reset input and pendingOperation
    if (pendingOperation) {
      setInput(valueToSet);
      setPendingOperation(null);
    } else if (input === "0") {
        // If the current input is "0", replace it with the new number
        setInput(valueToSet);
    } else {
        // Otherwise, append the number to the current input
        setInput(input + valueToSet);
    }

    // Always append the number to formulaInput
    if(formulaInput!="0"){
      setFormulaInput(formulaInput + valueToSet);
    }
};
  
  const addDot = e => {
  // If there's a pending operation, reset input and pendingOperation
    if (pendingOperation) {
      setInput('0.');
      setPendingOperation(null);
      setFormulaInput(formulaInput + '0.');
    } else if (input === "") {
      // If input is empty, prepend "0" before the dot
      setInput('0' + e.target.innerText);
      setFormulaInput(formulaInput + '0' + e.target.innerText);
    } else if (!input.includes('.')) {
      // If input is not empty and doesn't already contain a dot, add the dot
      setInput(input + e.target.innerText);
      setFormulaInput(formulaInput + e.target.innerText);
    }
    setActiveOperation(null);
  };

  const operatorType = (e) => {
    const value = e.target.innerText;

    // If there's already a pending operation or the last character is an operator, don't add another     operator to formulaInput
    if (!pendingOperation && !operators.includes(formulaInput[formulaInput.length - 1])) {
      setFormulaInput(formulaInput + value);
    }

    // Set the pending operation and active operation for styling
    setPendingOperation(value);
    setActiveOperation(value);
  };

  const minusPlus = () => {};
  const percent = () => {};
  const reset = (e) => {
    setActiveOperation(null);
    setInput("0");
    setFormulaInput("");
  };
  
  const getOperationButtonClassName = (operation) => {
    return `calcButton ${operation === activeOperation ? 'active' : ''}`;
  };
  
  const equals = () => {
    // Replace the multiplication symbol with the JavaScript operator
    let expression = formulaInput.replace(/X/g, '*').replace(/÷/g, '/');

    // Try to evaluate the expression
    try {
      let result = eval(expression);

      // Set the result to the input and formulaInput, handle it as you see fit
      setInput(String(result));
      setFormulaInput(String(result));
    } catch (error) {
      // If there's an error (e.g., invalid expression), you can handle it here
      // For example, you could clear the input or display an error message
      console.error("Error evaluating expression: ", error);
      setInput("Error");
      // Optionally reset formulaInput or handle error differently
    }
  };
  
  return(
    <div className = 'calculator'>
      <div className = 'formulaScreen'>{formulaInput}</div>
      <div className = 'outputScreen' id = 'display'>{input}</div>
      <div className = 'wrapper'>
        <div className='calcButton' id='clear' onClick={reset}>C</div>
        <div className='calcButton' id='other' onClick={minusPlus}>+/-</div>
        <div className='calcButton' id='other' onClick={percent}>%</div>
        <div className={getOperationButtonClassName('÷')} id='divide' onClick={operatorType}>÷</div>
        <div className='calcButton' id='seven' onClick={addNumber}>7</div>
        <div className='calcButton' id='eight' onClick={addNumber}>8</div>
        <div className='calcButton' id='nine' onClick={addNumber}>9</div>
        <div className={getOperationButtonClassName('X')} id='multiply' onClick={operatorType}>X</div>
        <div className='calcButton' id='four' onClick={addNumber}>4</div>
        <div className='calcButton' id='five' onClick={addNumber}>5</div>
        <div className='calcButton' id='six' onClick={addNumber}>6</div>
        <div className={getOperationButtonClassName('-')} id='subtract' onClick={operatorType}>-</div>
        <div className='calcButton' id='one' onClick={addNumber}>1</div>
        <div className='calcButton' id='two' onClick={addNumber}>2</div>
        <div className='calcButton' id='three' onClick={addNumber}>3</div>
        <div className={getOperationButtonClassName('+')} id='add' onClick={operatorType}>+</div>
        <div className='calcButton zero' id='zero' onClick={addNumber}>0</div>
        <div className='calcButton' id='decimal' onClick={addDot}>.</div>
        <div className='calcButton' id='equals' onClick={equals}>=</div>        
      </div>
    </div>
    
  );
}

export default App;
