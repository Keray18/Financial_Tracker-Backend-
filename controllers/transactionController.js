const Transaction = require('../models/transactionModel')


// Creating Transactions
const createTransaction = async (req, res) => {
    try {
        const { title, amount, transactionType, category, date, account, note } = req.body 
        if(!title ||
        !amount ||
        !transactionType ||
        !category ||
        !date ||
        !account) return res.status(400).json({
            success: false,
            message: "All fields must be filled."
        })

        const transaction = await Transaction.create({
            title,
            amount,
            transactionType,
            category,
            date,
            account,
            note
        })

        res.status(200).json({
            success: true,
            message: "Transaction recorded successfully!",
            transaction: {
                id: transaction._id,
                title: transaction.title,
                amount: transaction.amount,
                type: transactionType,
                category: transaction.category,
                date: transaction.date,
                account: transaction.account,
                note: transaction.note
            }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to record transaction.",
            error: err.message
        })
    }
}