const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const dbConfig = {
  user: "postgres",
  password: "Develop@2021",
  host: "localhost",
  port: 5432, // Default port for PostgreSQL
  database: "coffeedb",
};

const pool = new Pool(dbConfig);

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    release(); // Release the client
  }
});

const addUser = (
  firstName,
  middleName,
  lastName,
  email,
  password,
  successCallback,
  errorCallback
) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return errorCallback(err);
    }

    // Check if the user email already exists
    client.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
      (err, result) => {
        if (err) {
          release(); // Release the client
          console.error("Error checking user email:", err);
          return errorCallback(err);
        }

        if (result.rows.length > 0) {
          release(); // Release the client
          console.log("User with this email already exists");
          return errorCallback("User with this email already exists");
        }

        // Hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            release(); // Release the client
            console.error("Error hashing password:", err);
            return errorCallback(err);
          }

          // Insert the user details into the database
          const query =
            "INSERT INTO users (firstName, middleName, lastName, email, password, created_at, usertype) VALUES ($1, $2, $3, $4, $5, NOW(), 2)";

          client.query(
            query,
            [firstName, middleName, lastName, email, hashedPassword],
            (err, result) => {
              release(); // Release the client

              if (err) {
                console.error("Error adding user:", err);
                return errorCallback(err);
              } else {
                console.log("User added to the database");
                successCallback();
              }
            }
          );
        });
      }
    );
  });
};

const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        release(); // Release the client
        reject(err);
        return;
      }

      // Check if the user email already exists
      client.query(
        "SELECT * FROM users WHERE email = $1",
        [email],
        (err, result) => {
          if (err) {
            release(); // Release the client
            console.error("Error checking user email:", err);
            reject(err);
            return;
          }

          if (result.rows.length > 0) {
            const user = result.rows[0];
            const hashedPassword = user.password;

            // Compare the hashed password with the provided password
            bcrypt.compare(password, hashedPassword, (err, isMatch) => {
              release(); // Release the client
              if (err) {
                console.error("Error comparing passwords:", err);
                reject(err);
                return;
              }

              if (isMatch) {
                resolve(user); // User authenticated
              } else {
                reject(new Error("Incorrect password"));
              }
            });
          } else {
            release(); // Release the client
            reject(new Error("User not found"));
          }
        }
      );
    });
  });
};

const addProduct = (
  prdouctName,
  productPrice,
  category,
  stock,
  successCallback,
  errorCallback
) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return errorCallback(err);
    }

    // Check if the user email already exists
    client.query(
      "SELECT * FROM products WHERE productname = $1",
      [prdouctName],
      (err, result) => {
        if (err) {
          release(); // Release the client
          console.error("Error checking productname:", err);
          return errorCallback(err);
        }

        if (result.rows.length > 0) {
          release(); // Release the client
          console.log("productname already exists");
          return errorCallback("Uproductname already exists");
        }

        const query =
          "INSERT INTO products (productname, productprice, category, stock, created_at) VALUES ($1, $2, $3, $4, NOW())";

        client.query(
          query,
          [prdouctName, productPrice, category, stock],
          (err, result) => {
            release(); // Release the client

            if (err) {
              console.error("Error adding product:", err);
              return errorCallback(err);
            } else {
              console.log("Product added to the database");
              successCallback();
            }
          }
        );
      }
    );
  });
};

const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        release(); // Release the client
        reject(err);
        return;
      }

      // Check if the user email already exists
      client.query("SELECT * FROM products WHERE stock <> 0", (err, result) => {
        if (err) {
          release(); // Release the client
          console.error("Error checking products:", err);
          reject(err);
          return;
        }

        if (result.rows.length > 0) {
          release();
          resolve(result.rows);
        } else {
          release(); // Release the client
          reject(new Error("Product not found"));
        }
      });
    });
  });
};

const deleteProduct = (productId) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        release(); // Release the client
        reject(err);
        return;
      }

      // Delete the product based on its id
      client.query(
        "DELETE FROM products WHERE productid = $1",
        [productId],
        (err, result) => {
          release(); // Release the client

          if (err) {
            console.error("Error deleting product:", err);
            reject(err);
            return;
          }

          resolve(result.rowCount); // Resolve with the number of rows affected
        }
      );
    });
  });
};

const updateProduct = (
  productId,
  productName,
  productPrice,
  category,
  stock
) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        release(); // Release the client
        reject(err);
        return;
      }

      // Check if the product with given productId exists
      client.query(
        "SELECT * FROM products WHERE productid = $1",
        [productId],
        (err, result) => {
          if (err) {
            release(); // Release the client
            console.error("Error checking product:", err);
            reject(err);
            return;
          }

          if (result.rows.length === 0) {
            release(); // Release the client
            console.error("Product not found");
            reject("Product not found");
            return;
          }

          const query =
            "UPDATE products SET productname = $2, productprice = $3, category = $4, stock = $5 WHERE productid = $1";

          client.query(
            query,
            [productId, productName, productPrice, category, stock],
            (err, result) => {
              release(); // Release the client

              if (err) {
                console.error("Error updating product:", err);
                reject(err);
              } else {
                console.log("Product updated successfully");
                resolve();
              }
            }
          );
        }
      );
    });
  });
};

const addTransaction = (productNames, totalAmount, cash, change) => {
  return new Promise((resolve, reject) => {
    pool
      .connect()
      .then((client) => {
        const query =
          "INSERT INTO transactions (items, total, cash, change_amount, transaction_date) VALUES ($1, $2, $3, $4, NOW())";

        return client
          .query(query, [productNames, totalAmount, cash, change])
          .then((result) => {
            client.release(); // Release the client
            console.log("Product added to the database");
            resolve(result); // Resolve the promise
          })
          .catch((error) => {
            client.release(); // Release the client
            console.error("Error adding product:", error);
            reject(error); // Reject the promise with the error
          });
      })
      .catch((error) => {
        console.error("Error connecting to the database:", error);
        reject(error); // Reject the promise with the error
      });
  });
};

const fetchTransactions = () => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error("Error connecting to the database:", err);
          release(); // Release the client
          reject(err);
          return;
        }
  
        // Check if the user email already exists
        client.query("SELECT * FROM transactions", (err, result) => {
          if (err) {
            release(); // Release the client
            console.error("Error checking products:", err);
            reject(err);
            return;
          }
  
          if (result.rows.length > 0) {
            release();
            resolve(result.rows);
          } else {
            release(); // Release the client
            reject(new Error("Product not found"));
          }
        });
      });
    });
  };

module.exports = {
  pool,
  addUser,
  loginUser,
  addProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
  addTransaction,
  fetchTransactions
};
