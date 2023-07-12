const userModel = require("../models/user");


module.exports = {
    index,
    // create:createEmployee,
    new: newEmployee,
};

async function index(req, res) {
    // const employees = await EmployeeModel.find({});
    const users = [{
        _id: 1,
        firstName: 'Joe',
        lastName: 'Smith',
        dob: '02/15/1987',
        email: 'lsj@slgj.com',
        phone: '235-235-2356',
        position: 'CEO',
        dateOfHiring: '02/25/2013',
    }, {_id: 2}, {_id: 3}, {_id: 4}, {_id: 5}, {_id: 6}, {_id: 7}, {_id: 8}];
    res.render("employees/index", {title: "All Employees", users: users});
}

// userModel.find({}, function(err, employees){
//   res.render('employees/index', { title: 'All Employees', employees: employees });
// })

function newEmployee(req, res) {
    res.render('employees/new', {title: 'Create New Employee'})


    function newEmployee(req, res) {
        // We'll want to be able to render an
        // errorMsg if the create action fails
        res.render("employees/new", {title: "Add Employee", errorMsg: ""});
    }
}



