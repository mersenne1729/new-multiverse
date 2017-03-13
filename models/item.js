var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: { type: String, required: false },
    type: { type: String, required: false }
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;