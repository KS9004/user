const User = require('../models/userModel');


exports.create =(req,res)=>{
    if(!req.body.title) {
        return res.status(400).send({
            message: "Please enter user title."
        });
    }

    // create user
    const user = new User({
          title:req.body.title,
          email:req.body.email,
    });

    user.save().then(userD =>{
     res.send(userD);
    });
};

exports.getAll = (req, res) => {
    User.find()
        .then(userd => {
            res.send(userd);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the User."
        });
    });
 };

 // Get a single user with a username
exports.getById = (req, res) => {
    User.findById(req.params.userId)
        .then(oUser => {
            if(oUser) {
                res.send(oUser);
            }
            return res.status(404).send({
                message: "User not exist with id " + req.params.userId
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not exist with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });
 };


 // Update a User by the UserId
 exports.update = (req, res) => {
   // Validate Request because title is required
   if(!req.body.title) {
       return res.status(400).send({
           message: "Please enter User title."
       });
   }

   // Find User and update it
   User.findByIdAndUpdate(req.params.userId, {
       title: req.body.title,
       email: req.body.email 
   }, {new: true})
       .then(oUser => {
           if(oUser) {
               res.send(oUser);
           }
           return res.status(404).send({
               message: "User does not exist with UserId  " + req.params.userId
           });

       }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "User does not exist with UserId " + req.params.userId
           });
       }
       return res.status(500).send({
           message: "Some error occurred while retrieving the User with UserId" + req.params.userId
       });
   });
};

// Delete the User with the UserId
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(u => {
            if(u) {
                res.send({message: "User has been deleted successfully!"});
            }
            return res.status(404).send({
                message: "User not exist with UserId" + req.params.userId
            });
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not exist with UserId" + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while deleting the User with UserId" + req.params.userId
        });
    });
 };