const dependentModel = require("../models/dependent");
const {checkPermissions, checkPermissionError} = require("../services/permission-service");

module.exports = {
    show: showDependent,
    edit: editDependent,
    update: updateDependent,
    create: createDependent,
    delete: deleteDependent,
};

async function showDependent(req, res) {
    try {
        await checkPermissions('can_read_dependents', req.user._id);
        const dependent = await dependentModel.findOne({_id: req.params.id});
        res.render("dependents/show", {
            title: `${dependent.firstName} ${dependent.lastName}`,
            dependent
        });
    } catch (err) {
        checkPermissionError(err, res);
    }
}

async function editDependent(req, res) {
    try {
        await checkPermissions('can_update_dependents', req.user._id);
        const dependent = await dependentModel.findOne({_id: req.params.id});
        res.render("dependents/edit", {
            title: `${dependent.firstName} ${dependent.lastName}`,
            dependent
        });
    } catch (err) {
        checkPermissionError(err, res);
    }
}

async function updateDependent(req, res) {
    try {
        await checkPermissions('can_update_dependents', req.user._id);
        debugger
        let dependent = await dependentModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }).populate('user').exec();
        res.redirect(`/employees/${dependent.user.id}`)
    } catch (err) {
        checkPermissionError(err, res);
    }
}

async function createDependent(req, res) {
    try {
        await checkPermissions('can_create_dependents', req.user._id);
        debugger
        const newDependent = await dependentModel.create(req.body);
        res.redirect(`/employees/${req.body.user}`);
    } catch (err) {
        checkPermissionError(err, res);
        res.redirect(`/dependents/${req.body.user}?invalid_dep=true`);
    }
}

async function deleteDependent(req, res) {
    try {
        await checkPermissions('can_delete_dependents', req.user._id);
        let dependentId = req.params.id;
        let dependent = await dependentModel.findOne({ _id: req.params.id }).populate('user').exec();
        if (!dependentId || dependentId === 'null') {
            throw new Error(`'id' must be included as a query param`);
        } else {
            await dependentModel.deleteOne({_id: dependentId});
            res.redirect(`/employees/${dependent.user.id}`);
        }
    } catch (err) {
        checkPermissionError(err, res);
        throw new Error(err);
    }
}