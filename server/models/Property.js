    const mongoose = require('mongoose');

    const propertySchema = new mongoose.Schema({
        owner : {
            type:mongoose.Schema.Types.ObjectId, 
            ref:'User'
        },
        title : String,
        address : String, 
        photos : [String],
        description : String,
        perks : [String],
        extraInfo : String,
        maxGuests : Number,
        price : Number,
        bookedDates : [String],
    })

    module.exports = mongoose.model("Property", propertySchema);