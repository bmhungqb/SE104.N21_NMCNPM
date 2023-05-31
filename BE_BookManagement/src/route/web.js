import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/userController';
import bookController from '../controllers/bookController';
import customerController from '../controllers/customerController';
import supplierController from '../controllers/supplierController';
import discountController from '../controllers/discountController';
import rentController from '../controllers/rentController';
import invoiceController from '../controllers/invoiceController'
import regulationController from '../controllers/regulationController';
import receiptController from '../controllers/receiptController'
import bookReportController from '../controllers/bookReportController'

let router = express.Router();
import cors from "cors"
import requireAuth from '../middlewares/roleMiddleware'
let initWebRoutes = (app) => {
    router.get('/',requireAuth, homeController.getHomePage);

    // login
    router.post("/api/login", userController.handleLogin);
    router.post("/api/create-new-user",userController.handleSignup)
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
    // User
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.put("/api/edit-user", userController.handleEditUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);
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
    // Rent
    router.get("/api/get-all-rents",rentController.GetAllRent);
    router.post("/api/create-new-rent",rentController.CreateRent);
    router.post("/api/create-new-rentDetail",rentController.CreateRentDetail);
    router.put("/api/edit-rent",rentController.EditRent)
    router.delete("/api/delete-rent",rentController.DeleteRent)
    // Invoice
    router.get("/api/get-all-invoices",invoiceController.GetAllInvoice);
    router.get("/api/get-all-invoiceDetails",invoiceController.GetAllInvoiceDetail);
    router.post("/api/create-new-invoice",invoiceController.CreateInvoice)
    router.post("/api/create-new-invoiceDetail",invoiceController.CreateInvoiceDetail)
    // Regulation
    router.get("/api/get-all-regulations",regulationController.GetAllRegulation)
    router.post("/api/create-new-regulation",regulationController.CreateRegulation)
    // Receipt
    router.get("/api/get-all-receipts",receiptController.GetAllReceipts)
    router.post("/api/create-new-receipt",receiptController.CreateReceipt)
    router.post("/api/active-receipt-regulation",receiptController.ToggleRegulation)
    // Book Report
    router.get("/api/get-all-bookReports",bookReportController.GetBookReport)
    return app.use("/", router);
}

module.exports = initWebRoutes;