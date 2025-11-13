const { response } = require('express');
const mongodb = require('../data/database');
const { params } = require('../routes/user');
const ObjectId  = require ('mongodb').ObjectId;



// Get All

const getAll = async (req, res) => {
const result = await mongodb.getDatabase().db().collection('users').find() 
result.toArray().then((users) => {
    res.setHeader( 'content-Type', 'application/json')
    res.status(200).json(users[0]);
  
});
};
  // Get contact by ID
const getSingle = async (req, res) => {
const userId = new ObjectId(req.Params.id); 
const result = await mongodb.getDatabase().db().collection('users').find(_id, userId) 
result.toArray().then((users) => {
    res.setHeader( 'content-Type', 'application/json')
    res.status(200).json(users[0]);
  
});
}


// Post create contact
const createUser= async (req, res) => {
  const userId = new ObjectId(req.Params.id); 
  const user = {
    
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDatabase().db().collection('users').inserteOne({_id, userId},user) ;
    if(response.acknowlege > 0){
      res.status(204).send();
    }
    else
    
    res.status(500).json(response.error) ||'some error occured while creating the user'
  
}
  

// Put  update existing contact 
const updateUser= async (req, res) => {
  const userId = new ObjectId(req.Params.id); 
  const user = {
    
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDatabase().db().collection('users').replaceOne({_id, userId},user) ;
    if(response.modifiedCount > 0){
      res.status(204).send();
    }
    else
    
    res.status(500).json(response.error) ||'some error occured while updating the user'
  
}
  
// Delete  remove contact 
const deleteUser= async (req, res) => {
  const userId = new ObjectId(req.Params.id); 
  const user = {
    
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDatabase().db().collection('users').deleteOne({_id, userId},user) ;
    if(response.modifiedCount > 0){
      res.status(204).send();
    }
    else
    
    res.status(500).json(response.error) ||'some error occured while updating the user'
  
}
  


module.exports = {
   getAll, 
  getSingle, 
  createUser,
  updateUser,
  deleteUser 
};