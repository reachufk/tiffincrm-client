
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { TextField } from '@mui/material';

export const Contact = () => {
    const [formData, setFormdata] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        message: ''
    })
    const navigate = useNavigate();
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormdata({
            ...formData,
            [name]: value
        })
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        //todo
        const { email, password } = formData;
        try {
            // await signup(email, password).then(
            //     (response) => {
            //         // check for token and user already exists with 200
            //         //   console.log("Sign up successfully", response);
            //         navigate("/home");
            //         window.location.reload();
            //     },
            //     (error) => {
            //         console.log(error);
            //     }
            // );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSignup} style={{ marginTop: '16px' }}>
                <Stack gap={2} className="col-md-8 col-lg-6 mx-auto">
                    <TextField style={{ background: 'white' }} id="firstName" name='firstName' value={formData.firstName} label="First name" variant="outlined" onChange={handleOnChange} />
                    <TextField style={{ background: 'white' }} id="lastName" name='lastName' value={formData.lastName} label="Last name" variant="outlined" onChange={handleOnChange} />
                    <TextField style={{ background: 'white' }} id="phoneNumber" name='phoneNumber' value={formData.phoneNumber} label="Phone number" variant="outlined" onChange={handleOnChange} />
                    <TextField style={{ background: 'white' }} id="email" name='email' value={formData.email} label="Email address" variant="outlined" onChange={handleOnChange} />
                    <TextField style={{ background: 'white' }} id="message" name="message" value={formData.message} label="Message" variant="outlined" onChange={handleOnChange} multiline />
                    <Button variant="success" type="submit">Send</Button>
                </Stack>
            </form>
        </>
    );
};