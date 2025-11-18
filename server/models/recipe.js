let mongoose = require("mongoose");

// Create a model

// Define the schema for a recipe document (structure of the data)
let recipeModel = mongoose.Schema(
    {
    name: String, //Name is string
    ingredients: String, //ingredients is string
    instructions: String, //intructions is string
    time: String, //time is string
    type: String //type is string
    },
    {
        collection:"recipes" // Specify the MongoDB collection name
    }
);
module.exports=mongoose.model('Recipe',recipeModel);