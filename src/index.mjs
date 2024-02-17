import express from "express";
import { query, validationResult } from "express-validator";
import router from "./router.mjs";

const app = express();
app.use(express.json()); // { id: 1, username: 'rohandhiman', displayName: 'rohan' }

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

// global
// app.use(loggingMiddleware);

// multiple users
// app.use(loggingMiddleware, (request, response,next) => {
// console.log("wecond")
// next();
// });

// router another

// both will work fine
// app.use(router);
app.use("/api", router);

// only one method
// middleware
app.get(
  "/check",
  (request, response, next) => {
    console.log("middleware");
    next();
  },
  (request, response) => {
    //   response.send("hello world");
    //   response.send({ hello: "hello world" });
    response.status(201).send({ hello: "hello world" });
  }
);

// middleware
app.get("/check2", loggingMiddleware, (request, response) => {
  //   response.send("hello world");
  //   response.send({ hello: "hello world" });
  response.status(201).send({ hello: "hello world" });
});

///////// second value by middlware to request

const sendDataByMiddleware = (request, response, next) => {
  request.myCustomData = { id: "one", name: "rohan" };
  next();
};

app.get("/check-data-of-middleware", sendDataByMiddleware, (req, res) => {
  console.log(req.myCustomData);
});

app.get("/", (request, response) => {
  //   response.send("hello world");
  //   response.send({ hello: "hello world" });
  response.status(201).send({ hello: "hello world" });
});

app.get("/api/users", (request, response) => {
  response.send([
    {
      id: 1,
      username: "rohandhiman",
      displayName: "rohan",
    },
    {
      id: 2,
      username: "rohankumar",
      displayName: "rohan kumar",
    },
  ]);
});

// params
app.get("/api/users/:id", (request, response) => {
  //   console.log(request.params);
  if (isNaN(request.params.id)) {
    response.sendStatus(400).send({ error: "Please provide valid ID" });
  } else {
    console.log(parseInt(request.params.id));
  }
});

// query

app.get("/api/users-filter", (request, response) => {
  //   console.log(request.params);
  console.log(request.query); // { skip: '5', limit: '10' }
  const { query } = request;
  console.log(query); //{ skip: '5', limit: '10' }
  const {
    query: { skip, limit },
  } = request;
  console.log(skip, limit); // 5 10
});

// query with validation
app.get(
  "/api/users-filter-validation",
  query("skip")
    .isString()
    .withMessage("String should not be String")
    .notEmpty()
    .withMessage("Skip should not be empty"),
  (request, response) => {
    let result = validationResult(request);
    console.log(result);
  }
);

app.post("/api/users", (request, response) => {
  console.log(request.body);
  //   console.log(response.body);
});

app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  console.log(body, id); // { id: 1, username: 'rohandhiman', displayName: 'rohan' } 1
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

//localhost:3000
// localhost:3000/users
