import React, { useState, useEffect } from "react"

import "./Button.css"

const Button = ({ type, disabled, onClick, children }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("Hello");
        
        return () => {
            console.log("Goodbye");
        }
    });

    const handleOnClick = params => {
        setCount(count + 1);
        onClick(params);
    }

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={handleOnClick}
            className="Button">
            {`${children}: ${count}`}
        </button>
    );
}

export default Button;