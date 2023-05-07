import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import bookController from '../controllers/bookController';
import customerController from '../controllers/customerController';
let router = express.Router();
import cors from "cors"
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    // login
    router.post("/api/login", userController.handleLogin);
    // Book
    router.post("/api/create-new-book", bookController.handleCreateNewBook);
    router.get("/api/get-all-books", bookController.handleGetAllBooks);
    router.put("/api/edit-book", bookController.handleEditBook);
    router.delete("/api/delete-book", bookController.handleDeleteBook);
    // Customer
    router.get("/api/get-all-customers", customerController.handleGetAllCustomers);
    router.post("/api/create-new-customer", customerController.handleCreateNewCustomer);
    router.put("/api/edit-customer", customerController.handleEditCustomer);
    router.delete("/api/delete-customer", customerController.handleDeleteCustomer);
    return app.use("/", router);
}

module.exports = initWebRoutes;