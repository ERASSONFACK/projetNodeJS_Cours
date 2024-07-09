// on crée ici un modèle de données. pour en créer un autre, il faut créer un autre fichier avec la même structure.
const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    nom : {type : String},
    prenom : {type : String},
    email : {type : String},
    message : {type : String},

})

module.exports = mongoose.model('Contact', contactSchema);