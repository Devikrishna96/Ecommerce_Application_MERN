
const { addCategory,  getCategory, deleteCategory, viewAllCategories } = require('../../Controllers/categoryController');
const authAdmin = require('../../Middlewares/authAdmin');

const categoryRouter = require('express').Router();
categoryRouter.post('/add', authAdmin, addCategory);
categoryRouter.delete('/delete/:categoryId', authAdmin, deleteCategory);
categoryRouter.get('/all-categories', viewAllCategories);
categoryRouter.get('/:categoryId', getCategory);

module.exports = categoryRouter;