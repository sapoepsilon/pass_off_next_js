// Console.tsx

import React, { useState } from 'react';
import axios from 'axios';

type Props = {
    setConsoleOutput: React.Dispatch<React.SetStateAction<string>>;
};

const Console: React.FC<Props> = ({ setConsoleOutput }) => {
    const [consoleInput, setConsoleInput] = useState<string>('');

    const handleInteract = async () => {
        try {
            const res = await axios.post('http://localhost:8080/interact', { input: consoleInput });
            setConsoleOutput((prevOutput) => prevOutput + '\n' + res.data);
        } catch (err) {
            alert(`Error: ${err}`);
        }
    };

    return (
        <div className="mt-4">
            <input
                className="border p-2"
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
            />
            <button className="bg-green-500 text-white p-2 ml-2" onClick={handleInteract}>Send</button>
        </div>
    );
};

export default Console;
