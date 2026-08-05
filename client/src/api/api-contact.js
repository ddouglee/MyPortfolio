const API_BASE = "/api/contacts";

const handleResponse = async (response) => {
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to parse response JSON:", err);
    throw err;
  }
};

const handleError = (err) => {
  console.error("API call failed:", err);
  throw err;
};

const create = async (contacts, { t }) => {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`, // <-- This is the missing line!
      },
      body: JSON.stringify(contacts),
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const list = async (signal) => {
  try {
    const response = await fetch(API_BASE, {
      method: "GET",
      signal,
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const read = async ({ contactId }, { t }, signal) => {
  try {
    const response = await fetch(`${API_BASE}/${contactId}`, {
      method: "GET",
      signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};
const update = async ({ contactId }, { t }, contacts) => {
  try {
    const response = await fetch(`${API_BASE}/${contactId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify(contacts),
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

const remove = async ({ contactId }, { t }) => {
  try {
    const response = await fetch(`${API_BASE}/${contactId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${t}`,
      },
    });
    return await handleResponse(response);
  } catch (err) {
    return handleError(err);
  }
};

export { create, list, read, update, remove };