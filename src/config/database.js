// database configuration

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/my_money'
module.exports = mongoose.connect(url, { useNewUrlParser: true})

// mongoose message error config
mongoose.Error.messages.general.required = "The path attribute '{PATH}' is mandatory"
mongoose.Error.messages.Number.min = "The informed '{VALUE}' is lower than the min '{MIN}' "
mongoose.Error.messages.Number.max = "The informed '{VALUE}' is higher than the max '{MAX}'"
mongoose.Error.messages.String.enum = "'{VALUE}' is not valid for attribute '{PATH}'"