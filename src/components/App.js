import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [backspaceFlag, setBackspaceFlag] = useState(false);

    useEffect(() => {
        const symbols = new Set(['(', ')', ' ', '-']);
        let ogPhNum = '', showPhNum = '';
        for(let ch of inputValue)
        {
            if(!symbols.has(ch) && (ch >= '0' && ch <= '9'))
            {
                ogPhNum += ch;
            }
        }
        const length = ogPhNum.length;
        setIsDisabled((length == 10) ? false : true);

        if(length > 0)
        {
            if(length < 3)
            {
                showPhNum = '(' + ogPhNum.slice(0, 3);
            }
            else if(length == 3)
            {
                if(backspaceFlag)
                {
                    showPhNum = '(' + ogPhNum.slice(0, 2);
                }
                else
                {
                    showPhNum = '(' + ogPhNum.slice(0, 3) + ') ';
                }
                setBackspaceFlag(false);
            }
            else if(length <= 6)
            {
                showPhNum = '(' + ogPhNum.slice(0, 3) + ') ' + ogPhNum.slice(3, 6);
            }
            else
            {
                showPhNum = '(' + ogPhNum.slice(0, 3) + ') ' + ogPhNum.slice(3, 6) + '-' + ogPhNum.slice(6, 10);
            }
        }

        setInputValue(showPhNum);
    }, [inputValue]);

    return (
        <div>
            {/* Do not remove the main div */}
            <input type="text" value={inputValue} placeholder="(555) 555-5555" onChange={(e) => (setInputValue(e.target.value))} onKeyDown={(e) => {
                if(e.key == 'Backspace')
                {
                    if(inputValue.length == 6)
                    {
                        setBackspaceFlag(true);
                        setInputValue(inputValue.slice(0, 3) + inputValue.slice(3,4));
                    }
                }
            }} />
            <button disabled={isDisabled} onClick={() => (setInputValue(""))}>Submit</button>
        </div>
    )
}

export default App