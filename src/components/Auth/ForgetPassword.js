import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { Button, Stack, Row, Col } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [formData, setFormdata] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormdata({
      ...formData,
      [name]: value
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await login(email, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} style={{ marginTop: '16px' }}>
        <Stack gap={2} className="col-md-5 mx-auto">
          <TextField id="email" name='email' value={formData.email} label="Email address" variant="outlined" onChange={handleOnChange} />
          <TextField id="password" name="password" value={formData.password} label="Password" type="password" variant="outlined" onChange={handleOnChange} />
          <Button variant="primary" type="submit">Log In</Button>
        </Stack>
      </form>
      <Stack gap={2} className="col-md-5 mx-auto">
        <hr />
        <Row>
          <Col ><Link to='/' style={{ textDecoration: 'none' }} >Forgotten password?</Link></Col>
          <Col style={{ textAlign: 'end' }}><Link to='/signup' style={{ textDecoration: 'none' }}>Sign up tiffin aww</Link></Col>
        </Row>
      </Stack>

    </>
  );
};

export default ForgetPassword;
