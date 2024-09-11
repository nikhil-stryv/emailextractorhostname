import React, { useState } from 'react';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [host, setHost] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setHost('');

        if (!email.includes('@')) {
            setError('Please enter a valid email.');
            return;
        }

        try {
            const response = await fetch('https://hostextracterdemotask.azurewebsites.net/api/emailhostextracter?', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const data = await response.text();
            setHost(data);
        } catch (error) {
            setError('Error fetching host from email.');
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Email Host Extractor</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email" 
                        required
                    />
                    <button type="submit">Submit</button>
                </form>

                {error && <p className="error">{error}</p>}
                {host && <p className="result">{host}</p>}
            </div>
        </div>
    );
}

export default App;
