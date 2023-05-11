const url = "http://coreapi.smartvillageqatar.com";

export const getAll = async () => {
    const res = await fetch(`${url}/TblGroup/getPage`, {
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

  export const addOne = async (body) => {
    console.log(body)
    try {
      const res = await fetch(`${url}/TblGroup/save`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify(body),
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
    } catch (e) {
      console.log(e);
    }
  };

  export const updateGroup = async (group, newGroupData) => {
    try {
      const res = await fetch(`${url}/${group.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroupData),
      });
      if (res.ok) {
        const groupUpdated = await res.json();
        return groupUpdated;
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
}