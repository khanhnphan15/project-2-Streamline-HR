const userModel = require('../models/user');
const roleModel = require('../models/role');
const permissionModel = require('../models/permission');

const checkPermissions = async function (permissionName, userId) {
    try {
        const user = await userModel.findById(userId).populate({
            path: 'roles',
            populate: {
                path: 'permissions',
                model: 'Permission'
            }
        });

        let permissions = user.roles.reduce((acc, role) => {
            return [
                ...acc,
                ...role.permissions.reduce((acc1, permission) => {
                    return [
                        ...acc1,
                        permission.name,
                    ]
                }, []),
            ]
        }, []);

        if (Array.isArray(permissionName)) {
            if (!permissionName.every(pn => permissions.includes(pn))) {
                throw new Error(`User does not have permission to perform this action`);
            }
        } else {
            if (!permissions.includes(permissionName)) {
                throw new Error(`User does not have permission to perform this action`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

const checkPermissionError = function (err, res) {
    if (err.message === 'User does not have permission to perform this action') {
        res.send(401);
    }
}

module.exports = {
    checkPermissions,
    checkPermissionError,
}