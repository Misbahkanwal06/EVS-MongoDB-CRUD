

const jwt = require('jsonwebtoken');

const createToken = async (userObj) => {
    console.log(userObj);
    // return userObj;
    let token = await jwt.sign({ 
        id: userObj._id, e: userObj.email, n: userObj.name, 
        pass: userObj.password, creationDate: userObj.creationDate },
        "ashe",
        { expiresIn:'20'});
//let token = jwt.sign({_id:userObj._id,email:userObj.email,creationDate:userObj.creationDate}, 'shhhhh');
    console.log(token);
    return token;
}

const verifyToken = async(token)=>{
    try{
    if(!token) return { isValid:false, message:"No JWT token found"}
    let verify = await jwt.verify(token, "ashe")
    console.log("verify resp")
    console.log(verify)
    console.log("verify end")
    return {isValid:true,message:"Token verifications successfull"}
    }
    catch(e){
       if(e.name==="JsonWebTokenError") return {isValid:false,message:"Invalid token"}
       if(e.name==="TokenExpiredError") return {isValid:false,message:"token expired"}
    }
}


module.exports = { createToken, verifyToken };


