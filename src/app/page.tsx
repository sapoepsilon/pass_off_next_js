// Page.tsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Console from "@/app/console";
const Page: React.FC = () => {
    const [consoleOutput, setConsoleOutput] = useState<string>('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("File upload initiated."); // Log
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await axios.post('http://localhost:8080/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(`File upload success. Response: ${res.data}`); // Log
                alert(res.data);
            } catch (err) {
                console.error(`File upload failed. Error: ${err}`); // Log
                alert(`Error: ${err}`);
            }
        }
    };

    const handleRun = async () => {
        console.log("Run initiated."); // Log
        try {
            const res = await axios.post('http://localhost:8080/run');
            console.log(`Run success. Output: ${res.data}`); // Log
            setConsoleOutput(res.data);
        } catch (err) {
            console.error(`Run failed. Error: ${err}`); // Log
            alert(`Error: ${err}`);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl mb-4">Java Code Runner</h1>
            <input className="border p-2 mr-2" type="file" onChange={handleFileUpload} />
            <button className="bg-blue-500 text-white p-2" onClick={handleRun}>Run</button>
            <textarea
                className="border p-2 mt-4 w-full h-32"
                value={consoleOutput}
                readOnly
            />
            <Console setConsoleOutput={setConsoleOutput} /> {/* Use Console component */}
        </div>
    );
};

export default Page;
