import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { Button, Stack, Row, Col } from 'react-bootstrap';
import { TextField, InputAdornment, IconButton, InputLabel, FormControl, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; import { Link } from "react-router-dom";

const Login = () => {
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

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleLogin} style={{ marginTop: '16px' }}>
        <Stack gap={2} className="col-md-8 col-lg-6 mx-auto">
          <TextField style={{ background: 'white' }} id="email" name='email' value={formData.email} label="Email address" variant="outlined" onChange={handleOnChange} />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput style={{ background: 'white' }}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button variant="success" type="submit">Log In</Button>
        </Stack>
      </form>
      <Stack gap={2} className="col-md-8 col-lg-6 mx-auto">
        <hr />
        <Row>
          <Col ><Link to='/' style={{ textDecoration: 'none' }} >Forgotten password?</Link></Col>
          <Col style={{ textAlign: 'end' }}><Link to='/register' style={{ textDecoration: 'none' }}>Create new account</Link></Col>
        </Row>
      </Stack>

    </>
  );
};

export default Login;
