const express = require('express')
const { createTransaction, getAllTransactions, deleteTransactions } = require('../controllers/transactionController')
const authMiddleware = require('../middleware/authUser')


const Router = express.Router()

Router.post('/createTransaction', authMiddleware, createTransaction)
Router.get('/getAllTransactions', authMiddleware, getAllTransactions)
Router.delete('/delete', authMiddleware, deleteTransactions)

module.exports = Router