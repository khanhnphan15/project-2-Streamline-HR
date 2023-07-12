const userModel = require("../models/user");

module.exports = {
    index,
    create: createEmployee,
    update: updateEmployee,
    delete: deleteEmployee,
};

async function index(req, res) {
    const employees = await userModel.find({});
    console.log(employees);
    res.render("employees/index", {title: "All Employees", employees });
}

async function createEmployee(req, res) {
    try {
        const newUser = await userModel.create(req.body);
        console.log(newUser);
        res.redirect(`/employees/`);
    } catch (err) {
        console.log(err);
        res.render("employees/new", { errorMsg: err.message });
    }
}

async function updateEmployee(req, res) {
    try {
        const employee = await userModel.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            // If `new` isn't true, `findOneAndUpdate()` will return the
            // document as it was _before_ it was updated.
            { new: true }
        );
        if (!employee) {
            res.redirect('/employees/');
        }
        res.redirect('/employees/');
    } catch (err) {
        debugger
    }
}


async function deleteEmployee(req, res) {
    try {
        let employeeId = req.query.id;
        if (!employeeId || employeeId === 'null') {
            throw new Error(`'id' must be included as a query param`);
        } else {
            await userModel.deleteOne({_id: employeeId});
            res.redirect('/employees/');
        }
    } catch (err) {
        throw new Error(err);
    }
}