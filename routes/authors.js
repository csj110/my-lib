const express = require('express');

const router = express.Router();
const Author = require('../models/authors');

router.get('/', async (req, res) => {
  let searchOption = {};
  if (req.query.name != null && req.query.name != '') {
    searchOption.name= new RegExp(req.query.name,'i')
  }
	try {
		const authors = await Author.find(searchOption);
		res.render('authors/index', { authors: authors,searchOption:req.query });
	} catch (err) {
		res.redirect('/');
	}
});

router.get('/new', (req, res) => {
	res.render('authors/new', { author: new Author() });
});
router.post('/', async (req, res) => {
	const author = new Author({
		name: req.body.name
	});
	try {
    const newAuthor = await author.save();
    res.redirect('/authors');
	} catch (err) {
		res.render('authors/new', {
			author: author,
			errorMessage: 'Error is occur!'
		});
	}
	// author.save((err, new Author) => {
	// 	if (err) {
	// 		res.render('authors/new', {
	// 			author: author,
	// 			errorMessage: 'Error is occur!'
	// 		});
	// 	} else {
	// 		// res.redirect(`author/${newAuthor.id}`)
	// 		res.redirect(`authors`);
	// 	}
	// });
});

module.exports = router;
