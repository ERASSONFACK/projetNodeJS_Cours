// On crée ici un Contrôleur
//Appel de la dépendance express
var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// appel de la librairie dotenv
require('dotenv').config();

// utilisation de la dépendance(librairie) mongoose
var mongoose = require('mongoose');
const url = process.env.DATA_URL

mongoose.connect(url)
.then(console.log("Mongodb connecté!"))
.catch(error => console.log(error));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Appel de la dépendance(librairie) BCRYPT
const bcrypt = require('bcrypt');

// Import du modèle Contact
var Contact = require('./models/Contact');
// Import du modèle Blog
var Blog = require('./models/Blog');
var Car = require('./models/Car');

/**
 * 
 * partie contact
 */
app.post('/nouveaucontact', function(req, res){
    const Data = new Contact({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        message: req.body.message     
    });
    Data.save()
    .then(() => {
        console.log("Contact enregistré!")
        res.redirect('/');
    })
    .catch(error => console.log(error));
});

// app.get('/', function(req, res){
//     Contact.find()
//     .then((data)=>{
//         console.log(data);
//         res.end();
//     })
//     .catch(error => console.log(error));
// });

// READ
app.get('/', function(req, res){
    Contact.find().then((data)=>{
        res.render('Home', {data: data})
    })
    .catch(error => console.log(error));
});

// CREATE
app.get('/formulairecontact', function(req, res){
    res.render('NewContact');
});

// Affichage page UPDATE
app.get('/contact/:identifiant', function(req, res){
    Contact.findOne({
        _id : req.params.identifiant
    }).then((data)=>{
        res.render('EditContact', {data: data})
    })
    .catch(error => console.log(error));
})
// UPDATE

app.put('/udatecontact/:id', function(req, res){
    const Data = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        message: req.body.message
    }
    // matching : mise à jour des données si correspondance entre l'id présent dans la base de données
//  et l'id présent dans l'url.
    Contact.updateOne({
        _id : req.params.id
    }, {$set : Data})
        .then(result => {
            console.log(result);
            console.log("Contact modifié!");
            res.redirect('/');
        })
        .catch(error => console.log(error));
    })

        // DELETE

        app.delete('/deletecontact/:id', function(req, res){
            Contact.findOneAndDelete({_id : req.params.id})
           .then(() => {
            console.log("Contact supprimé!");
            res.redirect('/');
        })
        .catch(error => console.log(error));
        
})


//Permet de lire le fichier index.html 
// var path = require('path');


// app.get('/', function(req, res){
//     res.send("<html><body><h1>Express c'est génial</h1></body></html>");
// })

// app.get('/formulaire', function(req, res){
//     res.sendFile(path.resolve("index.html"));
// });

// app.get('/students', function(req, res){
//     res.send("<html><body><h1>Page Student !</h1></body></html>");
// });

// app.post('/submit-name', function(req, res){
//     // console.log("Votre nom est " + req.body.nom + " " + req.body.prenom);

//     res.send("Votre nom est " + req.body.nom + " " + req.body.prenom);
    
// })
// // Exercice 1 :
// app.post('/contactform', function(req, res){
//     res.send("Bonjour " + req.body.nom + " " + req.body.prenom + ",<br>" 
//         + "Merci de nous avoir contacté.<br>Nous reviendrons vers vous dans les plus brefs délais à cette adresse : " 
//         + req.body.email ) ;
// })

/**
 * 
 * partie Blog
 */

// // READ : Route pour afficher le formulaire
// app.get('/ajoutPost', function(req, res){
//     res.render('formulairePosts');
// });

// // Route pour enregistrer ou sauvegarder un nouveau post.
// app.post('/nouveaupost', function(req, res){
//     const Data = new Blog({
//         sujet: req.body.sujet,
//         auteur: req.body.auteur,
//         description: req.body.description,
//         message: req.body.message     
//     });
//     Data.save()
//     .then(() => {
//         console.log("Post enregistré!")
//         res.redirect('/Allposts');
//     })
//     .catch(error => console.log(error));
// });

// // Affichage de tous les posts
// app.get('/allposts', function(req, res){
//     Blog.find().then((data)=>{
//         console.log("Récupération de post réussie");
//         res.render('Allposts', {data: data})
// })
//    .catch(error => console.log(error));
    
// })
// // EDIT
// // Afficher une donnée sur la vue EditPost en fonction
// // se l'id mis en URL
// app.get('/blog/:id', function(req, res){
//     Blog.findOne({
//         _id : req.params.id
//     }).then((data)=>{
//         res.render('EditPost', {data: data})
//     })
//    .catch(error => console.log(error));
// })

// app.put('/updatepost/:id', function(req, res){
//     const Data = {
//         sujet: req.body.sujet,
//         auteur: req.body.auteur,
//         description: req.body.description,
//         message: req.body.message   
//     }

//    // matching : mise à jour des données si correspondance entre l'id présent dans la base de données
// //  et l'id présent dans l'url.
// Blog.updateOne({
//     _id : req.params.id
// }, {$set : Data})
//     .then(result => {
//         console.log(result);
//         console.log("Post modifié avec succès!");
//         res.redirect('/Allposts');
//     })
//     .catch(error => console.log(error));
// })

//     // DELETE

//     app.delete('/deletepost/:id', function(req, res){
//         Blog.findOneAndDelete({_id : req.params.id})
//         .then(() => {
//          console.log("Post supprimé avec succès!");
//          res.redirect('/Allposts');
//      })
//      .catch(error => console.log(error));
//     })
       
// Partie CAR

// READ : Route pour afficher le formulaire
app.get('/nouveauvehicule', function(req, res){
    res.render('FormulaireCars');
});

// Route pour enregistrer ou sauvegarder un nouveau post.
app.post('/nouveauvehiculesave', function(req, res){
    const Data = new Car({
        marque: req.body.marque,
        modele: req.body.modele,
        description: req.body.description,
        prix: req.body.prix     
           
    });
    Data.save()
    .then(() => {
        console.log("Vehicule enregistré!")
        res.redirect('/Allcars');
    })
    .catch(error => console.log(error));
});

// Affichage de tous les véhicules
app.get('/allcars', function(req, res){
    Car.find().then((data)=>{
        console.log("Récupération de vehicules réussie");
        res.render('Allcars', {data: data})
})
   .catch(error => console.log(error));
    
})
// EDIT
// Afficher une donnée sur la vue EditCars en fonction
// se l'id mis en URL
app.get('/editcars/:id', function(req, res){
    Car.findOne({
        _id : req.params.id
    }).then((data)=>{
        res.render('EditCars', {data: data})
    })
   .catch(error => console.log(error));
})

app.put('/updatecars/:id', function(req, res){
    const Data = {
        marque: req.body.marque,
        modele: req.body.modele,
        description: req.body.description,
        prix: req.body.prix,
        image: req.body.image,
        date: req.body.date,
          
    }

   // matching : mise à jour des données si correspondance entre l'id présent dans la base de données
//  et l'id présent dans l'url.
Car.updateOne({
    _id : req.params.id
}, {$set : Data})
    .then(data => {
        console.log("Vehicule modifié avec succès!");
        res.redirect('/Allcars');
    })
    .catch(error => console.log(error));
})

    // DELETE

    app.delete('/deletecars/:id', function(req, res){
        Car.findOneAndDelete({_id : req.params.id})
        .then(() => {
         console.log("Vehicule supprimé avec succès!");
         res.redirect('/Allcars');
     })
     .catch(error => console.log(error));
    })

    /**
     * 
     * Moodèle User
     */
    var User = require('./models/User');

    app.get('/inscription', function(req, res){
        res.render('Inscription');
    })
app.post('/api/newuser', function(req, res){

    var Data = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    admin : false
})
Data.save()
.then(() => {
    console.log("Utilisateur enregistré!")
    res.redirect('/login');
})
.catch(error => console.log(error));

});

/**
 * Route d'affichage du formulaire de connexion
 */
app.get('/login', function(req, res){
    res.render('Login');
})

app.post('/api/connexion', function(req, res){

User.findOne({
    email: req.body.email
}) .then(user => {
    if(!user){
        return res.status(404).send('Utilisateur non trouvé : email invalide');
    }
    console.log(user);

    if(!bcrypt.compareSync(req.body.password, user.password)){
        return res.status(404).send('Mot de passe incorrect');
    }
    if(user.admin === true){
        res.redirect('/admin')}
        else{
        res.redirect('/user')};
        
    res.render('profil', {data: user})
})
.catch(error => console.log(error));

});

app.get('/admin', function(req, res){
    User.find() .then((data)=>{
        res.render('Admin', {data: data});
    })
    .catch(error => console.log(error));
});



var server = app.listen(5000, function(){
    console.log('Server listening on port 5000');
})