// const url = "http://localhost:5000/users";

const url = "http://coreapi.smartvillageqatar.com/"

export const getAll = async () => {
  try {

    const res = await fetch(`${url}TblUser/getPage`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + sessionStorage.getItem("token"),
    },
  })
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
  console.log(res);
    if (res.sts.msg === "OK") {
      console.log(res)
      return res.rs;
    } else {
      return null;
    }
} catch (e) {
  console.log(e.message)
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

export const addOne = async (body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const newOne = await res.json();
      return newOne;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const updateOne = async (user, newData) => {
  try {
    const res = await fetch(`${url}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (res.ok) {
      const itemUpdated = await res.json();
      return itemUpdated;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteOne = async (id) => {
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


