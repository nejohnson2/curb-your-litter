var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a new schema
var InstagramSchema = new Schema({
    id: String,
    coordinates: [Number,Number],
    img_hi_res : String,
    img_lo_res :String,
    img_thumb : String,
    time: Number
});

// export 'Astronaut' model
module.exports = mongoose.model('Instagram', InstagramSchema);