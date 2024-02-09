import defaultData from "../Commons/Commons";
const sendCreateAccountRequest = (
  email,
  password,
  firstName,
  middleName,
  lastName
) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.signupURL, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        middleName,
        lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Network response was not ok"));
        } else {
          resolve(response);
        }
      })
      .then((data) => {
        // Simulating a successful account creation
        resolve(data);
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        reject(error);
      });
  });
};

const sendLoginRequest = (email, password) => {
  return new Promise((resolve,reject)=>{
    fetch(defaultData.loginURL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (!response.ok) {
        reject(new Error("Network response was not ok"));
      }
       resolve(response);
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error("There was an error!", error);
      reject(error)
    });
  })
};


export  {sendCreateAccountRequest, sendLoginRequest};
