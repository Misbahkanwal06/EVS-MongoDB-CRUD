
const {Schema,model} = require('mongoose');
const userSchema = Schema({
    name:String,
    email: {
        type:String, 
         unique: true,
        required: 'Email address is required'
    },
    password:String,
    bday: String,
    roll: Number,
    subj: String,
    token: String,
    iat: Number,
    creationDate:{ type: Date, default: Date.now }
})

const userModel = model('CRUD', userSchema);
module.exports = userModel;