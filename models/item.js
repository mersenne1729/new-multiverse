var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    title: { type: String, required: false },
    author: { type: String, required: false },
    url: { type: String, required: false },
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;