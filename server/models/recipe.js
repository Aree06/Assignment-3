let mongoose = require("mongoose");

// Create a model

let recipeModel = mongoose.Schema(
    {
    name: String,
    ingredients: String,
    instructions: String,
    time: String,
    type: String 
    },
    {
        collection:"recipes"
    }
);
module.exports=mongoose.model('Recipe',recipeModel);