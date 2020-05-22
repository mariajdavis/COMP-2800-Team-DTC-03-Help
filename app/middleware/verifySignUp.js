/**
 * Middleware for sign up verification.
 */

const db=require("../models");
const User=db.users;
const OrgUser=db.orgUsers;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user=>{
        if (user) {
            res.status(400).send({
               message: "Username is already in use." 
            });
        return;
        }

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message:"Email is already in use"
                });
            }

            next();
        });
    });
};

checkDuplicateUsernameOrEmailOrg = (req, res, next) => {
    OrgUser.findOne({
        where: {
            username: req.body.username
        }
    }).then(orgUser=>{
        if (orgUser) {
            res.status(400).send({
               message: "Username is already in use." 
            });
        return;
        }

        OrgUser.findOne({
            where: {
                email: req.body.email
            }
        }).then(orgUser => {
            if (orgUser) {
                res.status(400).send({
                    message:"Email is already in use"
                });
            }

            next();
        });
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkDuplicateUsernameOrEmailOrg: checkDuplicateUsernameOrEmailOrg
};
module.exports=verifySignUp;