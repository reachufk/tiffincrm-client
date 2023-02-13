import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import Private from "./components/Private";
import { Container } from 'react-bootstrap';
import { Header } from "./components/Header";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import { Category } from "./components/Category/Caterogy";

import "bootstrap/dist/css/bootstrap.min.css";
import 'animate.css';

function App() {
  return (
    <Container style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </Container>
  );
}

export default App;
