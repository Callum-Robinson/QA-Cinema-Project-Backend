var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name : String, 
    image : {
        date : {
            type : Buffer
        },
        contentType : {
            type : String
        }
    }
});

Image = mongoose.model('Image', BookingSchema);
Image = mongoose.model('Image', MovieSchema);

module.exports = Image;