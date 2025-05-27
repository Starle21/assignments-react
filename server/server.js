const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter(require("./routes.json"));

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.patch("/items/:id/done", (req, res, next) => {
    req.body.isDone = true;
    req.body.finishedAt = Date.now();
    next();
});

server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
    }
    next();
});

server.use(rewriter);

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running");
});
