const url = "http://coreapi.smartvillageqatar.com/";

export const getAll = async () => {
  try {
    const res = await fetch(`${url}TblBranch/getPage`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": "bearer " + sessionStorage.getItem("token"),
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

export const addOne = async (body) => {
    console.log(body)
  try {
    const res = await fetch(`${url}TblBranch/save`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(body),
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
  } catch (e) {
    console.log(e.message);
  }
};
