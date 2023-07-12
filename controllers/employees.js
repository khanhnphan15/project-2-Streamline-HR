const userModel = require("../models/user");

module.exports = {
    index,
    show: showEmployee,
    edit: editEmployee,
    update: updateEmployee,
    create: createEmployee,
    delete: deleteEmployee,
};

async function index(req, res) {
    const employees = await userModel.find({});
    console.log(employees);
    res.render("employees/index", {title: "All Employees", employees });
}

async function showEmployee(req, res) {
    const employee = await userModel.findOne({ _id: req.params.id });
    res.render("employees/show", {
        title: `${employee.firstName} ${employee.lastName}`,
        employee
    });
}

async function editEmployee(req, res) {
    const employee = await userModel.findOne({ _id: req.params.id });
    res.render("employees/edit", {
        title: `${employee.firstName} ${employee.lastName}`,
        employee
    });
}

async function updateEmployee(req, res) {
    try {
        await userModel.updateOne({ _id: req.params.id }, req.body);
        res.redirect(`/employees/${req.params.id}`)
    } catch (err) {

    }
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

async function deleteEmployee(req, res) {
    try {
        let employeeId = req.params.id;
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