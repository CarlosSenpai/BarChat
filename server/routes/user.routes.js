const UserController = require(`../controllers/user.contoller`);

module.exports = (app) => {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users/:id", UserController.getOneUser);
    app.delete("/api/users/:id", UserController.deleteOneUser);
    app.put("/api/users/:id", UserController.updateUser);
    app.get('/api/user', UserController.getLoggedInUser);
};