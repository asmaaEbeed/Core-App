const url = "http://coreapi.smartvillageqatar.com";

// export const getAll = async () => {
//     const res = await fetch(url);
//     if (res.ok) {
//       const fetchedUser = await res.json();
//       return fetchedUser;
//     } else {
//       return null;
//     }
//   };

export const getOne = async (id) => {
  console.log("appsetting")
    const res = await fetch(`${url}/TblSetting/getPage?userQuery=fkUserId=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      },
    }).then((res) => res.json()).then((data) => {return data});
    
    if (res.sts.msg === "OK") {
      console.log("ok")
      // const newOne = await res.json();
      // return newOne;
      console.log(res.rs.data[0])
      return res.rs.data[0];
    } else {
      return null;
    }
  };
  
  export const addOne = async (body) => {
      try {
        const res = await fetch(`${url}/TblSetting/save`, {
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
  
  export const updateOne = async (newData) => {
    console.log("updateone");
    console.log(newData)
    try {
      const res = await fetch(`${url}/TblSetting/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(newData),
      }).then((res) => res.json()).then((data) => {return data});
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
  