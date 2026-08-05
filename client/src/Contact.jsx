import React, { useState, useEffect } from "react";
import { list, create, remove } from "./api/api-contact";
import auth from './auth/auth-helper.js';

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [values, setValues] = useState({
    firstname: "", lastname: "", email: "", error: "", success: false
  });

  const authData = auth.isAuthenticated(); 
  const isAdmin = authData && authData.user && authData.user.role === 'admin';
  const token = authData ? authData.token : null;

  useEffect(() => {
    if (isAdmin) {
      const abortController = new AbortController();
      list(abortController.signal)
        .then((data) => {
          if (data && !data.error) setContacts(data);
        })
        .catch((err) => {
          if (err.name !== 'AbortError' && err.code !== 'ERR_ABORTED') {
            console.error("Fetch error:", err);
          }
        });
      return () => abortController.abort();
    }
  }, [isAdmin]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const contactData = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email
    };

    create(contactData, { t: token }).then((data) => {
          if (data.error) setValues({ ...values, error: data.error });
      else {
        setValues({ firstname: "", lastname: "", email: "", error: "", success: true });
        setTimeout(() => setValues({ ...values, success: false }), 3000);
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact</h1>
      <p>Phone: +1 (647) 581-5803</p>
      <br />
      <p>Email: <a href="mailto:douglasajani2@gmail.com">douglasajani2@gmail.com</a></p>
      <br />

      {isAdmin && (
        <div style={{ marginBottom: "40px", borderBottom: "2px solid #ccc", paddingBottom: "20px" }}>
          <h3>Contact List</h3>
            {contacts.length === 0 && (
                <p style={{ color: '#666' }}>No contacts in list.</p>
            )}
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {contacts.map((c) => (
              <li key={c._id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
                <p><strong>Name:</strong> {c.firstname} {c.lastname}</p>
                <p><strong>Email:</strong> {c.email}</p>
                <button 
                    onClick={() => remove({ contactId: c._id }, { t: token }).then((data) => {
                        if (!data.error) {
                            setContacts(contacts.filter(con => con._id !== c._id));
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
                    marginTop: '5px'
                  }}
                >
                  Delete Contact
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={clickSubmit}>
        First Name:<br />
        <input type="text" value={values.firstname} onChange={handleChange("firstname")} required /><br />
        Last Name:<br />
        <input type="text" value={values.lastname} onChange={handleChange("lastname")} required /><br />
        E-mail:<br />
        <input type="email" value={values.email} onChange={handleChange("email")} required /><br />
        <br /><input type="submit" value="Send" />
        <input type="reset" value="Reset" onClick={() => setValues({ firstname: "", lastname: "", email: "", error: "", success: false })} />
        {values.error && <p style={{ color: "red" }}>{values.error}</p>}
        {values.success && <p style={{ color: "green" }}>Contact created</p>}
      </form>
    </div>
  );
}