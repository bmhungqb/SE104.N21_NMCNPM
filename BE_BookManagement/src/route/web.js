import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import bookController from '../controllers/bookController';
import customerController from '../controllers/customerController';
import employeeController from '../controllers/employeeController';
import supplierController from '../controllers/supplierController';
import discountController from '../controllers/discountController';
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
    // Employee
    router.get("/api/get-all-employees", employeeController.handleGetAllEmployees);
    router.post("/api/create-new-employee", employeeController.handleCreateNewEmployee);
    router.put("/api/edit-employee", employeeController.handleEditEmployee);
    router.delete("/api/delete-employee", employeeController.handleDeleteEmployee);
    // Supplier
    router.get("/api/get-all-suppliers", supplierController.handleGetAllSuppliers);
    router.post("/api/create-new-supplier", supplierController.handleCreateNewSupplier);
    router.put("/api/edit-supplier", supplierController.handleEditSupplier);
    router.delete("/api/delete-supplier", supplierController.handleDeleteSupplier);
    // Discount
    router.get("/api/get-all-discounts", discountController.handleGetAllDiscounts);
    router.post("/api/create-new-discount", discountController.handleCreateNewDiscount);
    router.put("/api/edit-discount", discountController.handleEditDiscount);
    router.delete("/api/delete-discount", discountController.handleDeleteDiscount);
    return app.use("/", router);
}

module.exports = initWebRoutes;