const billingCycle = require ('./billingCycle')
const errorHandler = require ('../common/errorHandler')

billingCycle.methods(['get', 'post', 'put', 'delete']) // creating restful webservices
billingCycle.updateOptions({new: true, runValidators: true}) // guarantee service returns updated object, and run validators on put
// apply middleware after method
billingCycle.after('post', errorHandler).after('put', errorHandler)

billingCycle.route('count', (req, res, next) => {
    billingCycle.count((error, value) => {
        if(error){
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

billingCycle.route('summary', (req, res, next) => {
    billingCycle.aggregate([{
        $project: {credit: {$sum: "$credits.value"}, debit: {$sum: "$debits.value"}}
    }, {
         $group: {_id: null, credit: {$sum: "$credit"}, debit: {$sum: "$debit"}}
    }, {
        $project: {_id: 0, credit: 1, debit: 1}
    }]).exec((error, result) => {
        if(error){
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debit: 0})
        }
    })
})

module.exports = billingCycle