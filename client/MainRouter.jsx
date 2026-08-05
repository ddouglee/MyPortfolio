import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './src/user/Signup.jsx'
import Signin from './src/auth/Signin.jsx'
import Home from './components/Home'
import About from './src/About'
import Contact from './src/Contact'
import Education from './src/Education'
import Project from './src/Project'
import Layout from './components/Layout'
import Services from './src/Services'
const MainRouter = () => {
return (
<div>
<Layout/>
<Routes>
<Route exact path="/" element={<Home />} />
<Route path="/signup" element={<Signup/>}/>
<Route exact path="/signin" element={<Signin/>}/>
<Route exact path="/about" element={<About />} />
<Route exact path="/education" element={<Education />} />
<Route exact path="/project" element={<Project />} />
<Route exact path="/contact" element={<Contact />} />
<Route exact path="/services" element={<Services />} />
</Routes>
</div>
)
}
export default MainRouter