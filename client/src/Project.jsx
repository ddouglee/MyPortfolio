import React, { useState, useEffect } from "react";
import { list, remove, create } from "./api/api-project";
import auth from './auth/auth-helper.js';

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [values, setValues] = useState({
    title: "", firstname: "", lastname: "", email: "", description: "", completion: "", error: ""
  });

  const authData = auth.isAuthenticated(); 
  const isAdmin = authData && authData.user && authData.user.role === 'admin';
  const token = authData ? authData.token : null;

  useEffect(() => {
    const abortController = new AbortController();
    list(abortController.signal)
      .then((data) => {
        if (data && !data.error) setProjects(data);
      })
      .catch((err) => {
        if (err.name !== 'AbortError' && err.code !== 'ERR_ABORTED') {
          console.error("Fetch error:", err);
        }
      });
    return () => abortController.abort();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    if (!isAdmin) return;

    const projectData = {
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      description: values.description,
      completion: values.completion ? new Date(values.completion) : new Date()
    };

    create(projectData, { t: token }).then((data) => {
      if (!data.error) {
        setValues({ title: "", firstname: "", lastname: "", email: "", description: "", completion: "", error: "" });
        setProjects([...projects, data]);
      } else {
        setValues({ ...values, error: data.error });
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Projects</h1>
      
      {projects.length === 0 && !isAdmin && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
            There are currently no projects available for viewing.
        </p>
      )}

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {projects.map((proj) => (
          <li key={proj._id} style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
            <h3>{proj.title}</h3>
            <ul style={{ paddingLeft: "20px" }}>
               <li>Author: {proj.firstname} {proj.lastname}</li>
               <li>Description: {proj.description}</li>
            </ul>
            {isAdmin && (
              <div style={{ marginTop: "10px" }}>
                <button 
                  onClick={() => remove({ projectId: proj._id }, { t: token }).then((data) => {
                    if (!data.error) {
                        setProjects(projects.filter(p =>p._id !== proj._id));
                    } else {
                        alert("Delete failed: " + data.error);
                    }
                    })}
                  style={{ 
                    padding: '5px 15px', 
                    cursor: 'pointer', 
                    background: '#ff4081', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  Delete Project
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div style={{ marginTop: "40px", borderTop: "2px solid #ddd", paddingTop: "20px" }}>
          <h3>Add New Project</h3>
          <input type="text" placeholder="Title" value={values.title} onChange={handleChange("title")} /><br />
          <input type="text" placeholder="First Name" value={values.firstname} onChange={handleChange("firstname")} /><br />
          <input type="text" placeholder="Last Name" value={values.lastname} onChange={handleChange("lastname")} /><br />
          <input type="email" placeholder="Email" value={values.email} onChange={handleChange("email")} /><br />
          <textarea placeholder="Description" value={values.description} onChange={handleChange("description")} /><br />
          <label>Completion Date: <input type="date" value={values.completion} onChange={handleChange("completion")} /></label><br />
          <button onClick={clickSubmit}>Add Project</button>
          {values.error && <p style={{ color: "red" }}>{values.error}</p>}
        </div>
      )}
    </div>
  );
}