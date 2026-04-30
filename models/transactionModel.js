const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true 
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['Expense', 'Income', 'Transfer'],
        required: true
    },
    category: {
        type: String,
        enum: ['Food&Dining', 'Transport', 'Housing', 'Entertainment', 'Other'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    note: {
        type: String
    }

}, {
    timestamps: true
})

transactionSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model('Transaction', transactionSchema)