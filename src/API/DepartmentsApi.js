// const url = "http://localhost:5000/departments";
const url = "http://coreapi.smartvillageqatar.com/"

export const getAll = async () => {
  const res = await fetch(`${url}TblDepartment/getPage`, {
    headers: {
      'Authorization': "bearer " + sessionStorage.getItem("token"),
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    return data;
  });
  if (res.sts.msg === "OK") {
    return res.rs;
  } else {
    return null;
  }
};

export const getOne = async (id) => {
  const res = await fetch(`${url}/TblDepartment/getPage?userQuery=pkDepartmentId=${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      'Authorization': 'bearer ' + sessionStorage.getItem("token")
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return data;
  });
  if (res.sts.msg === "OK") {
    return res.rs;
  } else {
    return null;
  }
};

export const addOne = async (body) => {
  console.log(body)
  try {
    const res = await fetch(`${url}TblDepartment/save`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    if (res.sts.msg === "OK") {
      return res.rs;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateDepartment = async (dept, newDeptData) => {
  try {
    const res = await fetch(`${url}/${dept.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDeptData),
    });
    if (res.ok) {
      const deptUpdated = await res.json();
      return deptUpdated;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteDepartment = async (id) => {
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
