const url = "http://coreapi.smartvillageqatar.com";

export const getAll = async () => {
    const res = await fetch(`${url}/TblRole/getPage`, {
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

  export const addOne = async (body) => {
    try {
      const res = await fetch(`${url}/TblRole/save`, {
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