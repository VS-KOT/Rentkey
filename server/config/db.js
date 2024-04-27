const mongoose = require('mongoose');


const dbConnet = async () => {
    await mongoose.connect('mongodb+srv://vinayakkotwala12:6qSfpuFJafHBaZsn@cluster0.jsagbdx.mongodb.net/checking_rentkey')
    .then(() => console.log("DB connection established"))
    .catch((err) => {
        console.log("DB connection issue");
        console.log(err);
        process.exit(1);
    })
}
module.exports = dbConnet;