let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Recipe = require('../models/recipe');

// get --> Extract & read something
// post --> post something
// put --> Edit/Update some data
// delete --> Delete the data
// CRUD --> Create, Read, Update & Delete

// Get route for the read recipe list - Read Operation
router.get('/',async(req,res,next)=>{
    try
    {
        const RecipeList = await Recipe.find();
        console.log(RecipeList);
        res.render('Recipes/list',{
            title:'Recipes',
            RecipeList:RecipeList
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Recipes/list',{
            error:'Error on server'
        })
    }
})

// Get route for displaying the Add Page - Create Operation
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Recipes/add',{
            title:'Add a recipe'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Recipes/add',{
            error:'Error on server'
        })
    }
})
// Post route for processing the Add Page - Create Operation
router.post('/add',async(req,res,next)=>{
    try
    {
        let newRecipe = Recipe({
            "name":req.body.name,
            "ingredients":req.body.ingredients,
            "instructions":req.body.instructions,
            "time":req.body.time,
            "type":req.body.type
        });
        Recipe.create(newRecipe).then(()=>{
            res.redirect('/recipes')
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Recipes/list',{
            error:'Error on server'
        })
    }
})
// Get route for displaying the Edit Page - Update Operation
router.get('/edit/:id',async(req,res,next)=>{
     try{
        const id = req.params.id;
        const recipeToEdit = await Recipe.findById(id);
        res.render("Recipes/edit",
            {
                title: 'Edit Recipe',
                Recipe: recipeToEdit
            }
        )
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})
// Post route for processing the Edit Page - Update Operation
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updateRecipe = Recipe({
            "_id": id,
            "name":req.body.name,
            "ingredients":req.body.ingredients,
            "instructions":req.body.instructions,
            "time":req.body.time,
            "type":req.body.type
        })
        Recipe.findByIdAndUpdate(id, updateRecipe).then(()=>{
            res.redirect("/recipes")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})
// Get route for performing delete operation - Delete Operation
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        Recipe.deleteOne({_id:id}).then(()=>{
            res.redirect("/recipes")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }

})
module.exports = router;