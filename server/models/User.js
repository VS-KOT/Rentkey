const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    password: {
        type: String
    },
    bookings : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Bookings',
    },
    bookedPlaces : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Property',
    },
    profileImage: {
        type: String,
    },
    resetToken :{
        type: String,
    }
})


module.exports = mongoose.model("User", userSchema);