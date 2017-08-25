var express = require('express');
var router = express.Router();

var questions = [
  {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
  {id: 102, name: "Inception", year: 2010, rating: 8.7},
  {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
  {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
];

router.get('/', function(req, res, next) {
  res.json(questions);
});

router.get('/:id([0-9]{3,})', function(req, res) {
  var currQuestion = questions.filter(function(question) {
    if(question.id == req.params.id) {
      return true;
    }
  });

  if(currQuestion.length == 1) {
      res.json(currQuestion[0])
  } else {
    res.status(404);
    res.json({message: "Not Found"});
  }
});

router.post('/', function(req, res) {
  if(!req.body.name ||
     !req.body.year.toString().match(/^[0-9]{4}$/g) ||
     !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){

    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var newId = questions[questions.length-1].id + 1;
    movies.push({
      id: newId,
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating
    });

    res.json({message: "New question created.", location: "/questions/" + newId});
  }
});

router.put('/:id', function(req, res) {
  if(!req.body.name ||
     !req.body.year.toString().match(/^[0-9]{4}$/g) ||
     !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
     !req.params.id.toString().match(/^[0-9]{3,}$/g)) {
    
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var updateIndex = questions.map(function(question) {
       return question.id;
    }).indexOf(parseInt(req.params.id));
    
    if(updateIndex === -1) {
       questions.push({
          id: req.params.id,
          name: req.body.name,
          year: req.body.year,
          rating: req.body.rating
       });

       res.json({message: "New question created.", location: "/questions/" + req.params.id});
    } else {
       questions[updateIndex] = {
          id: req.params.id,
          name: req.body.name,
          year: req.body.year,
          rating: req.body.rating
       };

       res.json({message: "Question id " + req.params.id + " updated.", 
          location: "/questions/" + req.params.id});
    }
  }
});

router.delete('/:id', function(req, res) {
  var removeIndex = questions.map(function(question) {
    return question.id;
  }).indexOf(req.params.id);

  if(removeIndex === -1) {
    res.json({message: "Not found"});
  } else {
    questions.splice(removeIndex, 1);
    res.send({message: "Question id " + req.params.id + " removed."});
  }
});

module.exports = router;
