const access = (...roles) => {
    return (req, res, next) => {
        const userRole = req.role;

        console.log(userRole);
        if (roles.includes(userRole)) {
            next();
        }
        else {
            res.status(400).json({ message: "You have no access..."});
        }
    }
}

module.exports = access;