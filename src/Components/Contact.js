import React, {useState} from 'react';
import {useForm} from 'react-hook-form'
import {Button, Form} from 'reactstrap';
import axios from 'axios';

import "../css/Contact.css";


const Contact = () => {
    const {register, handleSubmit, errors} = useForm();
    const [error, setError] =  useState(false);

    const onSubmit = (data, e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/send-email/',{
            sender_name: data.name,
            sender_mail: data.email,
            content: data.text
        }).then(
            setError(false)
        ).catch(function (error) {
            setError(true);
        });
        e.target.reset();
    };

    return(
        <div id="contactContainer">
            <h1>PLEASE GET IN TOUCH</h1>
            <h4>You want to join us? You have some questions?</h4>
            <h4>We adore talking to our customers!</h4>
            <div id="contactDetails">
                <p>
                    <img src="https://img.icons8.com/material-outlined/35/000000/important-mail.png" alt="mail icon"/>
                    gelato@exampleMail.com
                </p>
                <p>
                    <img src="https://img.icons8.com/ios/35/000000/phone-not-being-used.png" alt="phone icon"/>
                    +48 123 456 789
                </p>
                <p>
                    <img src="https://img.icons8.com/ios-glyphs/35/000000/address.png" alt="address icon"/>
                    17 Piccadilly, Manchester, Great Britain
                </p>
            </div>
            <div id="form">
                <Form id="contactForm" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        ref={register({required: "Please type in your name!"})}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        ref={register({required: "Please type in your email!"})}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    <textarea
                        className="form-control"
                        name="text"
                        id="message"
                        placeholder="Message"
                        ref={register({required: "Please type in your message!"})}
                        form="contactForm"
                    />
                    {errors.text && <p className="error">{errors.text.message}</p>}
                    <Button type="submit">Send </Button>
                    {error && <p>Something went wrong! Please write to us manually!</p>}
                </Form>
            </div>
            <div className="push"></div>
        </div>

    )
};

export default Contact;