import db from '../models/index';
import requireAuth from '../middlewares/roleMiddleware'
let getHomePage = (req, res) => {
    return res.render('homePage.ejs');
}

module.exports = {
    getHomePage: getHomePage,
}


