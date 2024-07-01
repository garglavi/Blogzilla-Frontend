//isLoggedIn=>

export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data != null) return true;
    else return false;
  };
  
  //doLogin=> data=>set to localstorage
  
  export const doLogin = (data,next) => {
    localStorage.setItem("data", JSON.stringify(data));
    console.log("local storage: "+localStorage.getItem("data"));
    // localStorage.setItem("uid", JSON.stringify(data.id));
    // localStorage.setItem("uname", JSON.stringify(data.name));
    // localStorage.setItem("uemail", JSON.stringify(data.email));
    next()
  };
  
  //doLogout=> remove from localStorage
  
  export const doLogout = (next) => {
    localStorage.removeItem("data");
    // localStorage.removeItem("uid");
    // localStorage.removeItem("uname");
    // localStorage.removeItem("uemail");
    next()
  };
  
  //get currentUser
  export const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
      return JSON.parse(localStorage.getItem("data"));
    } else {
      return undefined;
    }
  };

  //needed to load posts for user
  
  export const getToken=()=>{
    if(isLoggedIn()){
      return JSON.parse(localStorage.getItem("data")).token
    }else{
      return null;
    }
  }