var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var Paper=mongoose.model('Paper');
var User=mongoose.model('User');

var datenow = new Date();

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

router.get('/api/papers', function(req, res, next) {

	Paper.find()
        .populate('authors reviewer')
        .exec(function(err, papers)
        {

            if (err)
            	res.send(err)

            res.json(papers);
        });

});

   

    router.get('/api/mypapers/:author_id', function(req, res) {

        Paper.find()
        .populate('authors reviewers')
        .exec(function(err, papers)
        {
            if (err)
                res.send(err)

            if(typeof papers != 'undefined')
            {
                var authored_papers = [];
                var j = 0;
                for (var i = 0; i < papers.length; i++)
                    {
                        for (var k = 0; k < papers[i].authors.length; k++)
                        {
                            if(papers[i].authors[k]._id == req.params.author_id)
                            {
                                authored_papers[j++] = papers[i];
                                break;
                            }
                        }
                    }
            }

            res.json(authored_papers);
        });       
    });

    router.get('/api/authors/', function(req, res) {

        Paper.find()
        .populate('authors')
        .exec(function(err, papers)
        {
            if (err)
                res.send(err)

            if(typeof papers != 'undefined')
            {
                var allAuthors = [];
                //var j = 0;
                for (var i = 0; i < papers.length; i++)
                    {
                        for (var k = 0; k < papers[i].authors.length; k++)
                        {
                            if (allAuthors.indexOf(papers[i].authors[k])==-1) 
                                allAuthors.push(papers[i].authors[k]);
                            //allAuthors[j++] = papers[i].authors[k];

                        }
                    }
            }

            res.json(allAuthors);
        });       
    });

    router.get('/api/reviewers/', function(req, res) {

        Paper.find()
        .populate('reviewers')
        .exec(function(err, papers)
        {
            if (err)
                res.send(err)

    
                var allReviewers = [];
                //var j = 0;
                for (var i = 0; i < papers.length; i++)
                    {
                        allReviewers.push(paper[i].reviewer); 
                    }
            

            res.json(allReviewers);
        });       
    });

	router.post('/api/papers', function(req, res) {

        // create a paper, information comes from AJAX request from Angular
        var status =  "Incomplete";
        if (req.body.title != null && req.body.title != "" && req.body.abstract != null 
            && req.body.abstract != "" && req.body.filename != null && req.body.filename != ""){
            status = "Completed";
        }

        Paper.create({
            title : req.body.title,
            //paperAuthors : req.body.authors,
            abstract : req.body.abstract,
            keywords : req.body.keywords,

            _creator : req.body.creator,
            authors : req.body.authors, // need to push? Paper.paperAuthors.push()?
            filename : req.body.filename,
            status
            
        }, function(err, paper) {
            if (err)
                res.send(err);
            else {
                    // required ->
                    res.json(paper);

                    // no need to store the papers in users!! ->

                    // for (var i = 0; i < req.body.authors.length; i++){
                    //     paper.paperAuthors.push(req.body.authors[i]);
                    //     paper.save(function(err) {
                    //         if (err)
                    //             res.send(err);

                    //         //res.json(paper);
                    //     });
                    // }


                // After creation of paper, update paperAuthors' profiles to add papersAuthored
                // for all UserObj.papersAuthored.push(paper);

                // for (var i = 0; i < paper.paperAuthors.length; i++){

                //     paper.paperAuthors[i].push(paper);
                    
                    // User
                    // .find({_id : paper.paperAuthors[i]._id})
                    // .exec(function(err, user){

                    //     console.log('#  User:::::::::: ', user);

                    //     user.papersAuthored.push(paper);

                    //     user.save(function(err) {
                    //         if (err)
                    //             res.send(err);

                    //         res.json(user);
                    //     });
                    // });

                    // }
                }

            });

    });

	// update a paper
	router.put('/api/papers/:paper_id', function(req, res) {

		Paper.findById(req.params.paper_id, function(err, paper) {
			if (err)
				res.send(err);

		    // Update the existing paper
             var statusTemp =  "Incomplete";
            if (req.body.title != null && req.body.title != "" && req.body.abstract != null 
            && req.body.abstract != "" && req.body.filename != null && req.body.filename != ""){
                statusTemp = "Completed";
            }

		    paper.title = req.body.title;
            paper.abstract = req.body.abstract;
            paper.keywords = req.body.keywords;
            paper.authors = req.body.authors;
            paper.updatedAt = datenow;
            paper.filename = req.body.filename,
            paper.status = statusTemp;

		    // Save the paper and check for errors
		    paper.save(function(err) {
		    	if (err)
		    		res.send(err);
                
                // required ->
		    	res.json(paper);
		    });
		});
	});

    // delete a paper
    router.delete('/api/papers/:paper_id', function(req, res) {
        var paper_id = req.params.paper_id;

        Paper.remove({
            _id : paper_id
        }, function(err, paper) {
            if (err)
                res.send(err);

            return res.status(200).send({
                message: 'Success!'
            });

            // get and return all the papers after you delete
            // Paper.find(function(err, papers) {
            //     if (err)
            //         res.send(err)
            //     res.json(papers);
            // });
        });
    });

	// retrieve a single paper
	router.param('paper', function(req, res, next, id) {
	  var query = Paper.findById(id);

	  query.exec(function (err, paper){
	    if (err) { return next(err); }
	    if (!paper) { return next(new Error('can\'t find paper')); }

	    req.paper = paper;
	    return next();
	  });
	});

	router.get('/api/papers/:paper', function(req, res) {
		res.json(req.paper);
	});

    // router.route('/upload/:filename')
    //     .get(upload.read);
    
    
    // router.route('/upload')
    //     .post(upload.create);
 
 
router.post('/api/upload', function(req, res) {
                
            var fname = req.files.file.name;
            var mime = req.files.file.mimetype;
            var filedata = req.files.file.data;
            var paper_id = req.body.paper_id;
                
                //store paper _id in metadata field and use it to retrieve the corresp. file
                var writeStream = gfs.createWriteStream({
                    filename: fname,
                    metadata: paper_id,
                    mode: 'w',
                    content_type:mime
                });
 
 
                writeStream.on('close', function() {
                     return res.status(200).send({
                        message: 'Success'
                    });
                });
                
                writeStream.write(filedata);
 
                writeStream.end();
 
});
 
 
router.get('/api/download/:paper_id', function(req, res) {
 
    //gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if(typeof req.params.paper_id != 'undefined' || req.params.paper_id != null)
    {
        gfs.files.find({ metadata: req.params.paper_id }).toArray(function (err, files) {
 
            if(files.length===0){
                return res.status(400).send({
                    message: 'File not found!'
                });
            }

            res.writeHead(200, {'Content-Type': files[0].contentType});

            var readstream = gfs.createReadStream({
              filename: files[0].filename
            });

            readstream.on('data', function(data) {
                res.write(data);
            });

            readstream.on('end', function() {
                res.end();        
            });

            readstream.on('error', function (err) {
              console.log('An error occurred!', err);
              throw err;
            });
        });
    }
    else{
        return res.status(400).send({
                    message: 'File not found!'
                });
    }
 
});  

router.delete('/api/deletefile/:paper_id', function(req, res) {      
    // also remove the attachment from gfs
    gfs.files.find({ metadata: req.params.paper_id }).toArray(function (err, files) {

        if(files.length===0){
            return res.status(400).send({
                message: 'File not found!'
            });
        }

        gfs.remove({
            filename: files[0].filename
        }, function (err) {
          if (err) return handleError(err);
          console.log('success');
          return res.status(200).send({
                    message: 'Success!'
          });
        });
    });
});  

module.exports = router;