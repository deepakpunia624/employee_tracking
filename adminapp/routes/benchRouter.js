let express = require("express");
let bench = require('../controller/benchController')

let benchRouter = express.Router();

benchRouter.get("/emplist/", bench.showEmployees);
benchRouter.patch("/Update/:id", bench.updateEmpStatus);
benchRouter.get("/search/:letter", bench.searchEmployee);

module.exports = benchRouter;