import React, { useState, useEffect } from "react";
import { list, create, remove } from "./api/api-edu";
import auth from './auth/auth-helper.js';

export default function Education() {
  const [educations, setEducations] = useState([]);
  const [values, setValues] = useState({
    title: "", firstname: "", lastname: "", email: "", description: "", completion: "", error: ""
  });

  const authData = auth.isAuthenticated(); 
  const isAdmin = authData && authData.user && authData.user.role === 'admin';
  const token = authData ? authData.token : null;

  useEffect(() => {
    list().then((data) => {
      if (data && !data.error) setEducations(data);
    }).catch(err => console.error(err));
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    if (!isAdmin) return;

    const educationData = {
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      description: values.description,
      completion: values.completion ? new Date(values.completion) : new Date()
    };

    create(educationData, { t: token }).then((data) => {
      if (!data.error) {
        setValues({ title: "", firstname: "", lastname: "", email: "", description: "", completion: "", error: "" });
        setEducations([...educations, data]);
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Education</h1>
      {educations.length === 0 && !isAdmin && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
            There are currently no qualifications available for viewing.
        </p>
      )}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {educations.map((edu) => (
          <li key={edu._id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "15px" }}>
            {/* FIX 1: The Title */}
            <p><strong>{edu.title}</strong></p>
            <p>{edu.firstname} {edu.lastname} - {edu.email}</p>
            <p>{edu.description}</p>

            {/* FIX 2: The Date */}
            <p>
              Completed: {
                edu.completion 
                ? new Date(edu.completion).toLocaleDateString() 
                : "N/A"
              }
            </p>

            {isAdmin && (
              <button 
                onClick={() => remove({ qualificationId: edu._id }, { t: token }).then((data) => {
                if (!data.error) {
                    setEducations(educations.filter(e => e._id !== edu._id));
                } else {
                    alert("Delete failed: " + data.error);
                }
                })}
                style={{ padding: '5px 15px', cursor: 'pointer', background: '#ff4081', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div style={{ marginTop: "40px", borderTop: "2px solid #ddd", paddingTop: "20px" }}>
          <h3>Add New Education</h3>
          <input type="text" placeholder="Title" value={values.title} onChange={handleChange("title")} /><br />
          <input type="text" placeholder="First Name" value={values.firstname} onChange={handleChange("firstname")} /><br />
          <input type="text" placeholder="Last Name" value={values.lastname} onChange={handleChange("lastname")} /><br />
          <input type="email" placeholder="Email" value={values.email} onChange={handleChange("email")} /><br />
          <textarea placeholder="Description" value={values.description} onChange={handleChange("description")} /><br />
          <label>Completion Date: <input type="date" value={values.completion} onChange={handleChange("completion")} /></label><br />
          <button onClick={clickSubmit}>Add Education</button>
          {values.error && <p style={{ color: "red" }}>{values.error}</p>}
        </div>
      )}
    </div>
  );
}