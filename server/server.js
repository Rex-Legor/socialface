const jsonServer = require("json-server");
const middleware = jsonServer.defaults();
const server = jsonServer.create();
const cors = require("cors");

server.use(cors());
server.use(middleware);
server.use(jsonServer.bodyParser);

const userData = require("./data");

server.get("/api/posts", (req, res, next) => {
  const pageNumber = req.query.pageNumber || 1;
  const userId = req.query.userId;
  const posts = userId
    ? userData.getPosts.posts.filter(
        ({ userData }) => userData && userData.id == userId,
      )
    : userData.getPosts.posts;
  // page 1: 0 - 3 (1 - 1 = 0 x 4 = 0, 0 + 3 = 3)
  // page 2: 4 - 7 (2 - 1 = 1 x 4 = 4, 4 + 3 = 7)
  // page 3: 8 - 11
  // page 4: 12 - 15
  // page 5: 16 - 19

  const sliceStart = (pageNumber - 1) * 4;
  const sliceEnd = sliceStart + 4;

  console.log(`Start: ${sliceStart} - End: ${sliceEnd}`);

  res.status(200).send({
    posts: posts.slice(sliceStart, sliceEnd),
    totalPages: posts.length / 4,
  });
});

server.post("/api/post/comment", async (req, res, next) => {
  res.status(201).send();
});

server.post("/api/post/like", async (req, res, next) => {
  res.status(201).send();
});

server.put("/api/user/update", async (req, res, next) => {
  res.status(200).send();
});

server.get("/api/ads", (req, res, next) => {
  res.status(200).send(userData.getAds.ads);
});

server.post("/auth/login", async (req, res, next) => {
  const data = await req.body;

  if (
    data.email == userData.getUsers.users[0].email &&
    data.password == "123"
  ) {
    res.status(200).send({
      user: {
        ...userData.getUsers.users[0],
        friends: userData.getUsers.users.slice(1),
      },
    });
  } else {
    res.status(401).send();
  }
});

server.post("/auth/signup", async (req, res, next) => {
  const data = await req.body;

  const emailExist = !!userData.getUsers.users.find(
    (user) => user.email == data.email,
  );

  if (emailExist) {
    res.status(400).send({ message: "already exist" });
  } else {
    res.status(201).send({
      user: {
        ...userData.getUsers.users[0],
        friends: userData.getUsers.users.slice(1),
      },
    });
  }
});

server.post("/auth/reset-password", async (req, res, next) => {
  const data = await req.body;

  const emailExist = !!userData.getUsers.users.find(
    (user) => user.email == data.email,
  );

  if (emailExist) {
    res.status(200).send();
  } else {
    res.status(400).send({ message: "no exist" });
  }
});

server.listen(3000, () => {
  console.log("JSON server listening on port 3000");
});
