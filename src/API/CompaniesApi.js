const url = "http://coreapi.smartvillageqatar.com/TblBusinessAccount/getPage";
const postUrl = "http://coreapi.smartvillageqatar.com/TblBusinessAccount/save";

export const getAll = async () => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + sessionStorage.getItem("token"),
      },
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
    console.log(e.message);
  }
};

export const getOne = async (id) => {
  const res = await fetch(`${url}?userQuery=pkBusinessAccountId=${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + sessionStorage.getItem("token"),
    },
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
};
export const deleteCompany = (id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    res.json();
  });

export const addCompany = async (body) => {
  try {
    const res = await fetch(postUrl, {
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
// .then((res) => {console.log("res post"); console.log(res); res.json()});

export const updateCompany = (company, newCoData) =>
  fetch(`${url}/${company.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCoData),
  });
