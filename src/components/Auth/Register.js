
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service";
import { Button, Stack } from 'react-bootstrap';
import { TextField, InputAdornment, IconButton, InputLabel, FormControl, OutlinedInput, FormHelperText } from '@mui/material';
import {
  MuiTelInput, matchIsValidTel,
  MuiTelInputCountry,
  MuiTelInputInfo,
  MuiTelInputContinent
} from 'mui-tel-input'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; import { Link } from "react-router-dom";
import './AuthStyle.css'
import { Notification } from "../../utils/notification";
import { validateFormData } from "../../utils/validateFormData";

const Register = () => {
  const navigate = useNavigate();


  const [formData, setFormdata] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  })

  const [showNotification, setShowNotification] = useState({
    text: '',
    severity: 'success',
    active: false
  })

  const [helpText, setHelpText] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  const [open, setOpen] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setHelpText({
      ...helpText,
      [name]: validateFormData(name, value)
    })
    setFormdata({
      ...formData,
      [name]: value.trim()
    })
  }

  const handleRegister = async (e) => {
    e?.preventDefault();

    const { firstName, lastName, phoneNumber, email, password } = formData;
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      setShowNotification({
        text: 'All fields are required',
        severity: 'error'
      });
      return setOpen(true)
    }
    try {
      await register(formData).then(
        (response) => {
          debugger
          navigate("/");
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

  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState('');


  const handlePhoneNumberChange = (newPhone) => {

    if (matchIsValidTel(newPhone)) {
      setInvalidPhoneNumber('');
      setFormdata({
        ...formData,
        'phoneNumber': newPhone
      })
    } else {
      setInvalidPhoneNumber('Invalid phone number');
    }
    setPhoneNumber(newPhone)
  }

  const notificationProps = {
    open: open,
    setOpen: setOpen
  }

  return (
    <>
      {open && <Notification {...showNotification} {...notificationProps} />}
      <form onSubmit={handleRegister} style={{ marginTop: '16px' }}>
        <Stack gap={2} className="col-md-8 col-lg-6 mx-auto">
          <TextField style={{ background: 'white' }} id="firstName" name='firstName' value={formData.firstName} label="First name" variant="outlined" onChange={handleOnChange} helperText={helpText.firstName} />
          <TextField style={{ background: 'white' }} id="lastName" name='lastName' value={formData.lastName} label="Last name" variant="outlined" onChange={handleOnChange} helperText={helpText.lastName} />
          <TextField style={{ background: 'white' }} id="email" name='email' value={formData.email} label="Email address" variant="outlined" onChange={handleOnChange} helperText={helpText.email} />
          <MuiTelInput style={{ background: 'white' }} id="phoneNumber" name='phoneNumber' value={phoneNumber} onChange={handlePhoneNumberChange} onlyCountries={['IN']} forceCallingCode defaultCountry="IN" />
          <span style={{ color: 'red' }}>{invalidPhoneNumber}</span>
          <FormControl variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput style={{ background: 'white' }} id='password' name="password" value={formData.password} label="Password" onChange={handleOnChange}
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
            />
            <FormHelperText id="password">{helpText.password}</FormHelperText>
          </FormControl>
          <Button variant="primary" type="submit">Register</Button>
        </Stack>
      </form>
      <Stack gap={2} className="col-md-8 col-lg-6 mx-auto">
        <hr />
        <Link to='/login' style={{ textAlign: 'center', textDecoration: 'none' }}>Already have an account?</Link>
      </Stack>
    </>
  );
};

export default Register;