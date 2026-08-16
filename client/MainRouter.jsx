// MainRouter.jsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
const Home = lazy(() => import('./components/Home'));
const Signup = lazy(() => import('./src/user/Signup'));
const Signin = lazy(() => import('./src/auth/Signin'));
const About = lazy(() => import('./src/About'));
const Contact = lazy(() => import('./src/Contact'));
const Education = lazy(() => import('./src/Education'));
const Project = lazy(() => import('./src/Project'));
const Services = lazy(() => import('./src/Services'));

const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MainRouter;