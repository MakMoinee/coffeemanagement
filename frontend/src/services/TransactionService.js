import defaultData from "../Commons/Commons";

const sendAddTransactionRequest = (productNames, totalAmount, cash, change) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.transURL, {
      method: "POST",
      body: JSON.stringify({
        productNames,
        totalAmount,
        cash,
        change,
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

const fetchTransactionsRequest = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    fetch(defaultData.transURL, {
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

export { sendAddTransactionRequest, fetchTransactionsRequest };
