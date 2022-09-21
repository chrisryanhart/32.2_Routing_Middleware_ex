const express = require('express');
const ExpressError = require('./errors.js');
const router = new express.Router();
const items = require('./fakeDb.js')

// import items from fakeDb
let item1 = {'name': 'popsicle', 'price': 1.45}
let item2 = {'name': 'cheerios', 'price': 3.40}

items.push(item1);
items.push(item2);

// add routes
router.get('/',function(req,res,next){
    try {
        return res.json(items)
    } catch (err) {
        return next(err);
    }
});

router.post('/',function(req,res,next){
    try {
        items.push(req.body);
        return res.send({'added':req.body})
    } catch (err) {
        return next(err);
    }
});

router.get('/:name',function(req,res,next){
    try {
        let item = items.find(item => item.name === `${req.params.name}`);
        // if (!item) throw new ExpressError('Item not found', 400);
        return res.json(item);
    } catch (err) {
        return next(err);
    }
});

router.patch('/:name',function(req,res,next){
    try {
        const foundItem = items.find(item => item.name === req.params.name);
        if (!foundItem) throw new ExpressError('Item not found', 400);

        foundItem.name = req.body.name;
        foundItem.price = req.body.price;
        res.json({"updated": foundItem})
    } catch (err) {
        return next(err);
    }
});

router.delete('/:name',function(req,res,next){
    try {
        const foundItem = items.find(item => item.name === req.params.name);
        if (!foundItem) throw new ExpressError('Item not found', 400);

        items.splice(foundItem,1);
        res.json({message: "Deleted"})
    }

    catch (err) {
        return next(err);
    }
});





module.exports = router;