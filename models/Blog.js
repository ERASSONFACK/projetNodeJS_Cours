// on crée ici un modèle de données. pour en créer un autre, il faut créer un autre fichier avec la même structure.
const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    sujet : {type : String},
    auteur : {type : String},
    description : {type : String},
    message : {type : String},

})

module.exports = mongoose.model('Blog', blogSchema);
