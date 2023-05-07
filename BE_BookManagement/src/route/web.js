import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import bookController from '../controllers/bookController';
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    // login
    router.post("/api/login", userController.handleLogin);
    // Book
    router.post("/api/create-new-book", bookController.handleCreateNewBook);
    router.get("/api/get-all-books", bookController.handleGetAllBooks);
    return app.use("/", router);
}

module.exports = initWebRoutes;