// on crée ici un modèle de données. pour en créer un autre, il faut créer un autre fichier avec la même structure.
const mongoose = require('mongoose');
const carSchema = mongoose.Schema({
    marque : {type : String},
    modele : {type : String},
    description : {type : String},
    prix : {type : Number},
    image : {type : String},
    date : {type : Date, default: Date.now},


})

module.exports = mongoose.model('Car', carSchema);