import { useState } from "react";
import Display from "../generalComponents/Display";
import Button from "../generalComponents/Button";
import "../../styles/calculator/Calculator.css";

function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  const appendToDisplay = (input) => {
    const operators = ["+", "-", "*", "/"];

    if (isResultDisplayed) {
      if (operators.includes(input)) {
        setDisplayValue(displayValue + input);
      } else {
        setDisplayValue(input);
      }
      setIsResultDisplayed(false);
    } else {
      if (displayValue === "0") {
        if (input === "0" || operators.includes(input)) {
          return;
        } else {
          setDisplayValue(input);
          return;
        }
      }
      const lastChar = displayValue[displayValue.length - 1];
      if (operators.includes(lastChar) && operators.includes(input)) {
        return;
      }
      setDisplayValue(displayValue + input);
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setIsResultDisplayed(false);
  };

  const calculate = () => {
    try {
      const result = evaluateExpression(displayValue);
      setDisplayValue(result.toString());
      setIsResultDisplayed(true);
    } catch (error) {
      setDisplayValue("Error");
    }
  };

  const evaluateExpression = (expression) => {
    const validExpressionRegex = /^[\d\s()+\-*/.]+$/;

    if (!validExpressionRegex.test(expression)) {
      throw new Error("Invalid expression");
    }

    const safeEval = new Function("return " + expression);
    const result = safeEval();

    if (!isFinite(result)) {
      throw new Error("Result is not a finite number");
    }

    return result;
  };

  return (
    <div id="calculator">
      <Display value={displayValue} />
      <div id="keys">
        {["7", "8", "9", "+"].map((char, index) => (
          <Button
            key={index}
            onClick={() => appendToDisplay(char)}
            className={
              ["+", "-", "*", "/"].includes(char) ? "operator-btn" : ""
            }
          >
            {char}
          </Button>
        ))}
        {["4", "5", "6", "-"].map((char, index) => (
          <Button
            key={index + 4}
            onClick={() => appendToDisplay(char)}
            className={
              ["+", "-", "*", "/"].includes(char) ? "operator-btn" : ""
            }
          >
            {char}
          </Button>
        ))}
        {["1", "2", "3", "*"].map((char, index) => (
          <Button
            key={index + 8}
            onClick={() => appendToDisplay(char)}
            className={
              ["+", "-", "*", "/"].includes(char) ? "operator-btn" : ""
            }
          >
            {char}
          </Button>
        ))}
        {["0", ".", "=", "/"].map((char, index) => (
          <Button
            key={index + 12}
            onClick={char === "=" ? calculate : () => appendToDisplay(char)}
            className={
              ["+", "-", "*", "/"].includes(char) ? "operator-btn" : ""
            }
          >
            {char}
          </Button>
        ))}
        <Button onClick={clearDisplay} className="operator-btn">
          C
        </Button>
      </div>
    </div>
  );
}

export default Calculator;
