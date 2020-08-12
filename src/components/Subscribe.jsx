import React from 'react';
import fetch from 'isomorphic-fetch';
const Subscribe = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(e.target.email.value)
        const email = {email: e.target.email.value}
        fetch('/api/email', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify(email)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Subscribe us</h3>
            <label>
            Email:
            <input type="email" name="email"/>
            </label>
            <input type="submit" />
        </form>
    )
}

export default Subscribe;