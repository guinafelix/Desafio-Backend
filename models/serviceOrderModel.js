const mongoose = require('mongoose');

const ServiceOrder = mongoose.model('ServiceOrder', {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    typeOfOrder: String,
    date: String,
});

module.exports = ServiceOrder;