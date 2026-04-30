const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')


// Creating Transactions
const createTransaction = async (req, res, next) => {
    try {
        const { title, amount, transactionType, category, date, account, note } = req.body 
        const allowedTypes = ['Expense', 'Income', 'Transfer'];

        if (!allowedTypes.includes(transactionType)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid transaction type" 
            });
        }

        if(!title ||
        !amount ||
        !transactionType ||
        !category ||
        !date ||
        !account) return res.status(400).json({
            success: false,
            message: "All fields must be filled."
        })

        const userId = req.user?.id
        if(!userId) return res.status(401).json({
            success: false,
            message: "Unauthorized! Please login."
        })

        const transaction = await Transaction.create({
            user: userId,
            title: title.trim(),
            amount: amount,
            transactionType,
            category,
            date,
            account: account.trim(),
            note: note.trim()
        })

        res.status(201).json({
            success: true,
            message: "Transaction recorded successfully!",
            transaction: {
                user: userId,
                id: transaction._id,
                title: transaction.title,
                amount: transaction.amount.toString(),
                transactionType: transaction.transactionType,
                category: transaction.category,
                date: transaction.date,
                account: transaction.account,
                note: transaction.note
            }
        })

    } catch (err) {
        next(err)
        
    }
}

// All Transactions
const getAllTransactions = async (req, res, next) => {
    try {
        const userId = req.user.id 
        const page = parseInt(req.query.page) || 1
        const limit = 10

        const transactions = await Transaction
        .find({ user: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

        res.status(200).json({
            success: true,
            message: "Authorized Access! Fetching Transactions...",
            transactions
        })

    } catch (err) {
        next(err)
    }
}

// Delete Multiple Transactions
const deleteTransactions = async (req, res, next) => {
    
    try {
        const userId = req.user.id 
        const { ids } = req.body 
        
        if(!ids || !Array.isArray(ids)) return res.status(400).json({
            success: false,
            message: "Invalid request."
        })

        const result = await Transaction.deleteMany({
            _id: { $in: ids },
            user: userId 
        })

        res.status(200).json({
            success: true,
            message: "Transactions deleted successfully.",
            deletedCount: result.deletedCount
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createTransaction,
    getAllTransactions,
    deleteTransactions
}