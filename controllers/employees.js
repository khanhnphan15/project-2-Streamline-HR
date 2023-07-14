const userModel = require("../models/user");
const dependentModel = require("../models/dependent");
const {checkPermissions, checkPermissionError} = require("../services/permission-service");

module.exports = {
    index,
    show: showEmployee,
    edit: editEmployee,
    update: updateEmployee,
    create: createEmployee,
    delete: deleteEmployee,
};

async function index(req, res) {
    try {
        debugger
        await checkPermissions('can_read_employees', req.user._id);
        const employees = await userModel.find({});
        let q = req.query.q;
        if (q) {
            let filteredEmployees = employees.filter(e => {
                return `${e.firstName} ${e.lastName}`.toLowerCase().includes(q.toLowerCase()) || e.email.includes(q.toLowerCase())
            });
            res.render("employees/index", {title: "All Employees", employees: filteredEmployees, q });
        } else {
            res.render("employees/index", {title: "All Employees", employees, q: ''});
        }
    } catch (err) {
        checkPermissionError(err, res);
    }
}

async function showEmployee(req, res) {
    try {
        await checkPermissions(['can_read_employees', 'can_read_dependents'], req.user._id);
        const employee = await userModel.findOne({_id: req.params.id});
        const dependents = await dependentModel.find({ user: req.params.id });
        res.render("employees/show", {
            title: `${employee.firstName} ${employee.lastName}`,
            employee,
            dependents,
        });
    } catch (err) {
        checkPermissionError(err, res);
    }
}

async function editEmployee(req, res) {
    try {
        await checkPermissions('can_update_employees', req.user._id);
        const employee = await userModel.findOne({_id: req.params.id});
        res.render("employees/edit", {
            title: `${employee.firstName} ${employee.lastName}`,
            employee
        });
    } catch (err) {
        checkPermissionError(err, res);
    }
}

async function updateEmployee(req, res) {
    try {
        await checkPermissions('can_update_employees', req.user._id);
        await userModel.updateOne({_id: req.params.id}, req.body);
        res.redirect(`/employees/${req.params.id}`)
    } catch (err) {
        checkPermissionError(err, res);
    }
}

async function createEmployee(req, res) {
    try {
        await checkPermissions('can_create_employees', req.user._id);
        const newUser = await userModel.create(req.body);
        console.log(newUser);
        res.redirect(`/employees/`);
    } catch (err) {
        checkPermissionError(err, res);
        res.render("/employees/", {errorMsg: err.message});
    }
}

async function deleteEmployee(req, res) {
    try {
        await checkPermissions('can_delete_employees', req.user._id);
        let employeeId = req.params.id;
        if (!employeeId || employeeId === 'null') {
            throw new Error(`'id' must be included as a query param`);
        } else {
            await userModel.deleteOne({_id: employeeId});
            res.redirect('/employees/');
        }
    } catch (err) {
        checkPermissionError(err, res);
        throw new Error(err);
    }
}