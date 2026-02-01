import { Route, Routes } from "react-router-dom";

import Home from './componentes/pages/Home'
import Project from "./componentes/pages/Project";
import Company from './componentes/pages/Company'
import Contact from './componentes/pages/Contact'
import Newproject from './componentes/pages/Newproject'
import EditProject from "./componentes/pages/EditProject";

import Container from "./componentes/layout/Container";
import Navbar from './componentes/layout/Navbar'
import Footer from "./componentes/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<Newproject />} />
          <Route path="/editproject/:id" element={<EditProject />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
