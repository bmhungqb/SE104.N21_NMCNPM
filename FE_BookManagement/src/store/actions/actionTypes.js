const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //Book
    CREATE_BOOK_SUCCESS: 'CREATE_BOOK_SUCCESS',
    CREATE_BOOK_FAILED: 'CREATE_BOOK_FAILED',
    EDIT_BOOK_SUCCESS: 'EDIT_BOOK_SUCCESS',
    EDIT_BOOK_FAILED: 'EDIT_BOOK_FAILED',
    DELETE_BOOK_SUCCESS: 'DELETE_BOOK_SUCCESS',
    DELETE_BOOK_FAILED: 'DELETE_BOOK_FAILED',
    FETCH_ALL_BOOKS_SUCCESS: 'FETCH_ALL_BOOKS_SUCCESS',
    FETCH_ALL_BOOKS_FAILED: 'FETCH_ALL_BOOKS_FAILED',

    //Supplier
    CREATE_SUPPLIER_SUCCESS: 'CREATE_SUPPLIER_SUCCESS',
    CREATE_SUPPLIER_FAILED: 'CREATE_SUPPLIER_FAILED',
    EDIT_SUPPLIER_SUCCESS: 'EDIT_SUPPLIER_SUCCESS',
    EDIT_SUPPLIER_FAILED: 'EDIT_SUPPLIER_FAILED',
    DELETE_SUPPLIER_SUCCESS: 'DELETE_SUPPLIER_SUCCESS',
    DELETE_SUPPLIER_FAILED: 'DELETE_SUPPLIER_FAILED',
    FETCH_ALL_SUPPLIERS_SUCCESS: 'FETCH_ALL_SUPPLIERS_SUCCESS',
    FETCH_ALL_SUPPLIERS_FAILED: 'FETCH_ALL_SUPPLIERS_FAILED',

    //Customer
    CREATE_CUSTOMER_SUCCESS: 'CREATE_CUSTOMER_SUCCESS',
    CREATE_CUSTOMER_FAILED: 'CREATE_CUSTOMER_FAILED',
    EDIT_CUSTOMER_SUCCESS: 'EDIT_CUSTOMER_SUCCESS',
    EDIT_CUSTOMER_FAILED: 'EDIT_CUSTOMER_FAILED',
    DELETE_CUSTOMER_SUCCESS: 'DELETE_CUSTOMER_SUCCESS',
    DELETE_CUSTOMER_FAILED: 'DELETE_CUSTOMER_FAILED',
    FETCH_ALL_CUSTOMERS_SUCCESS: 'FETCH_ALL_CUSTOMERS_SUCCESS',
    FETCH_ALL_CUSTOMERS_FAILED: 'FETCH_ALL_CUSTOMERS_FAILED',

    //User
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',
    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',
    //Discount
    CREATE_DISCOUNT_SUCCESS: 'CREATE_DISCOUNT_SUCCESS',
    CREATE_DISCOUNT_FAILED: 'CREATE_DISCOUNT_FAILED',
    EDIT_DISCOUNT_SUCCESS: 'EDIT_DISCOUNT_SUCCESS',
    EDIT_DISCOUNT_FAILED: 'EDIT_DISCOUNT_FAILED',
    DELETE_DISCOUNT_SUCCESS: 'DELETE_DISCOUNT_SUCCESS',
    DELETE_DISCOUNT_FAILED: 'DELETE_DISCOUNT_FAILED',
    FETCH_ALL_DISCOUNTS_SUCCESS: 'FETCH_ALL_DISCOUNTS_SUCCESS',
    FETCH_ALL_DISCOUNTS_FAILED: 'FETCH_ALL_DISCOUNTS_FAILED',
    //Regulation
    CREATE_REGULATION_SUCCESS: 'CREATE_REGULATION_SUCCESS',
    CREATE_REGULATION_FAILED: 'CREATE_REGULATION_FAILED',
    EDIT_REGULATION_SUCCESS: 'EDIT_REGULATION_SUCCESS',
    EDIT_REGULATION_FAILED: 'EDIT_REGULATION_FAILED',
    DELETE_REGULATION_SUCCESS: 'DELETE_REGULATION_SUCCESS',
    DELETE_REGULATION_FAILED: 'DELETE_REGULATION_FAILED',
    FETCH_ALL_REGULATIONS_SUCCESS: 'FETCH_ALL_REGULATIONS_SUCCESS',
    FETCH_ALL_REGULATIONS_FAILED: 'FETCH_ALL_REGULATIONS_FAILED',

    // Invoice(purchase)
    CREATE_INVOICE_SUCCESS: 'CREATE_INVOICE_SUCCESS',
    CREATE_INVOICE_FAILED: 'CREATE_INVOICE_FAILED',
    CREATE_INVOICE_DETAIL_SUCCESS: 'CREATE_INVOICE_DETAIL_SUCCESS',
    CREATE_INVOICE_DETAIL_FAILED: 'CREATE_INVOICE_DETAIL_FAILED',
    FETCH_ALL_INVOICES_SUCCESS: 'FETCH_ALL_INVOICES_SUCCESS',
    FETCH_ALL_INVOICES_FAILED: 'FETCH_ALL_INVOICES_FAILED',
    FETCH_ALL_INVOICES_DETAIL_SUCCESS: 'FETCH_ALL_INVOICES_DETAIL_SUCCESS',
    FETCH_ALL_INVOICES_DETAIL_FAILED: 'FETCH_ALL_INVOICES_DETAIL_FAILED',
    // EDIT_REGULATION_SUCCESS: 'EDIT_REGULATION_SUCCESS',
    // EDIT_REGULATION_FAILED: 'EDIT_REGULATION_FAILED',
    // DELETE_REGULATION_SUCCESS: 'DELETE_REGULATION_SUCCESS',
    // DELETE_REGULATION_FAILED: 'DELETE_REGULATION_FAILED',

    // Rent
    CREATE_RENT_SUCCESS: 'CREATE_RENT_SUCCESS',
    CREATE_RENT_FAILED: 'CREATE_RENT_FAILED',
    CREATE_RENT_DETAIL_SUCCESS: 'CREATE_RENT_DETAIL_SUCCESS',
    CREATE_RENT_DETAIL_FAILED: 'CREATE_RENT_DETAIL_FAILED',
    FETCH_ALL_RENTS_SUCCESS: 'FETCH_ALL_RENTS_SUCCESS',
    FETCH_ALL_RENTS_FAILED: 'FETCH_ALL_RENTS_FAILED',
    FETCH_ALL_RENTS_DETAIL_SUCCESS: 'FETCH_ALL_RENTS_DETAIL_SUCCESS',
    FETCH_ALL_RENTS_DETAIL_FAILED: 'FETCH_ALL_RENTS_DETAIL_FAILED',
    // statistic
    FETCH_MONTH_STATISTIC_SUCCESS: 'FETCH_MONTH_STATISTIC_SUCCESS',
    FETCH_MONTH_STATISTIC_FAILED: 'FETCH_MONTH_STATISTIC_FAILED',
    FETCH_ALL_STATISTIC_SUCCESS: 'FETCH_ALL_STATISTIC_SUCCESS',
    FETCH_ALL_STATISTIC_FAILED: 'FETCH_ALL_STATISTIC_FAILED',
    FETCH_BOOK_REPORT_SUCCESS: 'FETCH_BOOK_REPORT_SUCCESS',
    FETCH_BOOK_REPORT_FAILED: 'FETCH_BOOK_REPORT_FAILED',
    FETCH_DEBT_REPORT_SUCCESS: 'FETCH_DEBT_REPORT_SUCCESS',
    FETCH_DEBT_REPORT_FAILED: 'FETCH_DEBT_REPORT_FAILED',
})

export default actionTypes;