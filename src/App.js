import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import Private from "./components/Private";
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Container } from 'react-bootstrap';
import { Header } from "./components/Header";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import { Category } from "./components/Category/Caterogy";
import { SideNav } from "./components/Sidenav/Sidenav";
import { CollapseContext,CollapseProvider } from "./hooks/custom-contexts/display-toggle-hook"
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/layout.css"
import 'animate.css';
import { useContext } from "react";

function App() {

  return (
    <Container style={{ background: '#f5f5f5', minHeight: '100vh' ,minWidth:'100%'}}>
      <ProSidebarProvider>
    <CollapseProvider>
      <Header />
      <aside>
      <SideNav />
      </aside>
      <section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
      </section>
      </CollapseProvider>
      </ProSidebarProvider>

    </Container>
  );
}

export default App;
