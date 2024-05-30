const express = require("express");

const app = express();

const port = process.env.port || 2000;
let dataArray = [];

function randomIdGenerator() {
  let randomID = Math.floor(Math.random() * 1000 + 1);
  return randomID;
}

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening on this url: http://localhost:${port}`);
});

// get all user data
app.get("/users", (req, res) => {
  res.status(200).json({
    users: dataArray,
  });
});

// get specific user data
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  let userData;
  let userFound = false;
  dataArray.forEach((element, index) => {
    if (element.id == id) {
      userData = dataArray[index];
      console.log(`User id: ${id} data is `);
      userFound = true;
      res.status(200).json({
        message: userData,
      });
    }
  });
  if (!userFound) {
    res.status(404).json({
      message: `User id: ${id} not found `,
    });
  }

  res.status(200).json({
    userData: dataArray,
  });
});

// post api
app.post("/submit", (req, res) => {
  const body = req.body;

  function generateUniqueID() {
    let id;
    let uniqueID = false;
    while (!uniqueID) {
      id = randomIdGenerator();
      uniqueID = !dataArray.some((e) => e.id == id);
    }
    return id;
  }

  let id = generateUniqueID();

  //   dataArray.forEach((element) => {
  //     if (element.id == id) {
  //       id = randomIdGenerator();
  //       res.send("Resend Post request as ID is not unique.");
  //     }
  //   });

  
  dataArray.push(body);
  res.status(200).json({
    message: "Successfully Submitted the data",
    data: body,
  });

  console.log(dataArray);
});

// delete api
app.delete("/deleteuser/:id", (req, res) => {
  const paramID = req.params.id;

  let userFound = false;
  dataArray.forEach((element, index) => {
    if (element.id == paramID) {
      dataArray.splice(index, 1);
      console.log(`User deleted succesfully for id: ${paramID}`);
      userFound = true;
      res.status(200).json({
        message: `User deleted succesfully for id: ${paramID}`,
      });
    }
  });
  if (!userFound) {
    res.status(404).json({
      message: `User id: ${paramID} not found `,
    });
  }
});

// put api
app.put("/user/:id", (req, res) => {
  const body = req.body;
  const paramID = req.params.id;

  let userFound = false;
  dataArray.forEach((element, index) => {
    if (element.id == paramID) {
      dataArray[index] = body;

      userFound = true;
      res.status(200).json({
        message: `User Updated Succesfully for id: ${paramID}`,
      });
    }
  });
  if (!userFound) {
    res.status(404).json({
      message: `User id: ${paramID} not found `,
    });
  }
});

app.use((req, res) => {
  res.status(404).send("Page Not Found || 404");
});
