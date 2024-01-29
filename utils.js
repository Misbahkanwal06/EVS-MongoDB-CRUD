

const bcrypt = require('bcrypt');
const saltRounds = 10;

const createHash = async (myPlaintextPassword) => {
    const hashPass = await bcrypt.hashSync(myPlaintextPassword, saltRounds);
     return hashPass;
}

const comparePass  = async(password,hash)=>{
    const  comparedpass = await bcrypt.compareSync(password,hash);
    return comparedpass;
}

module.exports={createHash, comparePass};





