import { useEffect, useState } from 'react';
import postData from './helpers/fetch.js';

const Longpolling = (props) => {
    const [message, Setmassage] = useState('');
    const [messages, Setmassages] = useState([]);

    const handlesubmit = (e) => {
        e.preventDefault();
        postData('http://localhost:3000/massages', { message }).then(() => Setmassage(''));

    };

    useEffect(() => {
        fetch('http://localhost:3000/massages/subscribe')
            .then((res) => res.json())
            .then((data) => Setmassages(messages.concat(data)));

    }, [messages]);
    return (
        <>
            <div className="form-center">
                <form id="form" className="validate" onSubmit={handlesubmit}>
                    <div className="form-field">
                        <label>message </label>
                        <input type="text" name="message" id="message" placeholder="message" required onChange={(e) => Setmassage(e.target.value)} value={message} />

                    </div>

                </form>

            </div>
            <section>
                <div>
                    <h2>messages</h2>
                    <ul>
                        {
                            messages.map((m, i) => <li key={i}>{m.message}</li>)
                        }
                    </ul>
                </div>
            </section>

        </>


    );
};

export default Longpolling