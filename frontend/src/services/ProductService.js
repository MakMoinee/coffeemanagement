import defaultData from "../Commons/Commons";

const sendAddProductRequest = (productName, productPrice, category, stock) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.productsURL, {
      method: "POST",
      body: JSON.stringify({
        productName,
        productPrice,
        category,
        stock,
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
        console.error("Error creating product:", error);
        reject(error);
      });
  });
};

const fetchProductsRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.productsURL, {
      method: "GET",
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
        reject(error);
      });
  });
};

const deleteProductsRequest = (id) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.productsURL + `/${id}`, {
      method: "DELETE",
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
        reject(error);
      });
  });
};

const sendUpdateProductRequest = (
  id,
  productName,
  productPrice,
  category,
  stock
) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.productsURL + `/update/${id}`, {
      method: "POST",
      body: JSON.stringify({
        productName,
        productPrice,
        category,
        stock,
        btnUpdate: true,
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
        console.error("Error creating product:", error);
        reject(error);
      });
  });
};

export {
  sendAddProductRequest,
  fetchProductsRequest,
  deleteProductsRequest,
  sendUpdateProductRequest,
};
