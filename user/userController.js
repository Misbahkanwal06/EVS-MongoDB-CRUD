
const { createToken, verifyToken } = require("../secuirty/jwtToken");
const { createHash, comparePass } = require("../utils");
const userModel = require("./userModel");
const { MongoClient, ObjectId } = require('mongodb');

const userCreate = async (req, res) => {
    console.log(req.body);
    let { password } = req.body;
    let pwdResp;
    try {
        if (password) pwdResp = await createHash(password);
        if (!pwdResp) throw (`can't create password hash`);
        password = pwdResp;
        const ucreate = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: password,
        })
        const uRes = await ucreate.save();
        //  res.status(200).send(uRes);
        res.send(uRes, email);
    } catch (error) {
        console.log(error);
        return error;
    }
}

const viewAll = async (req, res) => {
    const resss = await userModel.find()
    console.log(resss);
    return resss;
}


const userView = async (req, res) => {
    console.log(req.params.id);
    const objectId = new ObjectId(req.params.id);
    const resss = await userModel.findOne({ _id: objectId });
    console.log(resss);
    return resss;
}

const userUpdate = async (req, res) => {
    const objectId = new ObjectId(req.params.id);
    const pwdResp = await createHash(req.body.password);
    let token = createToken(objectId);
    // { $set: { name: req.body.name, email: req.body.email, password: pwdResp, token: token} }
    const result = await userModel.updateOne({ _id: objectId }, { $set: { token: token } });
    console.log(result);
    res.send(result);
}

const userDelete = async (req, res) => {
    // db.RecordsDB.deleteOne({name:"Mak"})
    try {
        const objectId = new ObjectId(req.params.id);
        const ress = await userModel.deleteOne({ _id: objectId });
        console.log(ress);
        if (ress.deletedCount === 0) throw ("error")
        else {
            res.send(ress);
        }
    } catch (error) {
        res.send(error);
    }
}

const userlogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const userObj = await userModel.findOne({ email: email });
        if (!userObj && userObj.email) {
            res.send("User not Exist");
        }
        else {
            const bcryptResp = await comparePass(password, userObj.password)
            if (!bcryptResp) {
                res.send("Invalid Password");
            } else {
                let token = await createToken(userObj);
                if (token) {
                    // res.send("successfull login");
                    userObj.token = token;
                    const uRes = await userObj.save();
                    console.log(uRes);
                    return uRes;
                }
            }
        }
    } catch (error) {
        res.send(error);
    }
}

const tokenVerification = async (req, res) => {
    const { authentication } = req.headers;
    try {
        let authResp = authentication && await verifyToken(authentication)
        console.log(authResp)
        if (authResp.isValid) return authResp.message
        else if (!authResp.isValid) throw authResp.message;
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
}

module.exports = { userCreate, userView, viewAll, userUpdate, userDelete, userlogin, tokenVerification };

