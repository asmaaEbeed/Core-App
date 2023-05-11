const url = "http://coreapi.smartvillageqatar.com/Login"

export const loginVerify = async (body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => res.json()).then((data) => {console.log(data); return data});

      console.log(res);
      if (res.sts.msg === "OK") {
        console.log("ok")
        // const newOne = await res.json();
        // return newOne;
        console.log(res.rs)
        return res.rs;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e.message);
    }
  };