const url = "http://coreapi.smartvillageqatar.com";

export const getAll = async () => {
  const res = await fetch(`${url}/TblEmployee/getPage`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      'Authorization': 'bearer ' + sessionStorage.getItem("token")
    },
  }).then((res) => res.json()).then((data) => {return data});
  if (res.sts.msg === "OK") {
    return res.rs;
  } else {
    return null;
  }
};

export const getOne = async (id) => {
  const res = await fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (res.ok) {
    const resJson = await res.json();
    return resJson;
  } else {
    return null;
  }
};

export const addItem = async (body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const newDataAdded = await res.json();
      return newDataAdded;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const updateOne = async (emp, newEmpData) => {
  try {
    const res = await fetch(`${url}/${emp.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmpData),
    });
    if (res.ok) {
      const empUpdated = await res.json();
      return empUpdated;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteItem = async (id) => {
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    return null;
  }
};