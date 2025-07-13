const asyncHandler = require("express-async-handler");
const Transaction = require("../models/Transaction");


const getAll = asyncHandler(async (req, res) => {
  const txns = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
  res.json(txns);
});


const create = asyncHandler(async (req, res) => {
  const { type, category, amount, date, description } = req.body;

  if (!type || !category || !amount || !date) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const txn = await Transaction.create({
    user: req.user.id,
    type,
    category,
    amount: parseFloat(amount),
    date,
    description: description || "", 
  });

  res.status(201).json(txn);
});


const remove = asyncHandler(async (req, res) => {
  const deleted = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!deleted) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  res.json({ message: "Transaction deleted" });
});

const clearAll = asyncHandler(async (req, res) => {
  await Transaction.deleteMany({ user: req.user.id });
  res.json({ message: "All transactions deleted" });
});

module.exports = {
  getAll,
  create,
  remove,
  clearAll, 
};
