const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const orgUser=db.orgUsers;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    let user = User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        fullName: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
    if (!user) {
            return res.status(404).send({message: "Error in creating User."});
        }
    return res.status(200).send({
        message: "Accoung Registration Successful."
    })
    
    
};

exports.orgsignup = (req, res) => {
    // Save User to Database
    let orguser = orgUser.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    if (!orguser) {
        return res.status(404).send({message: "Error in creating User."});
    }
    return res.status(200).send({
        message: "Accoung Registration Successful."
    })
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
              });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.orgsignin = (req, res) => {
    orgUser.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(orgUser => {
            if (!orgUser) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                orgUser.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: orgUser.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: orgUser.id,
                username: orgUser.username,
                email: orgUser.email,
                accessToken: token
              });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};