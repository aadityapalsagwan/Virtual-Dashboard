const express = require('express');
const router = express.Router();

const person = require('../models/person');



// Post Request to add a person
router.post('/', async (req,res) =>{
    try{
        const data = req.body  // Assuming the request body contain the person data
      
        // create a new person document using the Mongoose model
        const newPerson = new person(data);
      
        //Save the new Person to the database
        const response = await newPerson.save();
        console.log('data saved successfully');
        res.status(200).json(response);
        
      }
      catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Serve Error'});
    }
})


router.get('/', async (req, res) => {
    try { 
      const persons = await person.find();
      console.log('data fetched');
      res.status(200).json(persons);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:fieldData', (req, res) => {
    const field = req.query.field;

    // Check if field is provided and valid
    if (!field) {
        console.error('Field parameter is missing');
        return res.status(400).json({ error: 'Field parameter is required' });
    }

    // Validate the field name to ensure it's a known field
    const validFields = [
        'end_year', 'country', 'intensity', 'sector', 'topic', 'insight',
        'url', 'start_year', 'added', 'published', 'relevance', 'pestel',
        'source', 'title', 'likelihood', 'region', 'impact',"city"
    ];

    if (!validFields.includes(field)) {
        console.error(`Invalid field parameter: ${field}`);
        return res.status(400).json({ error: 'Invalid field parameter' });
    }

    // Create a projection object
    const projection = {};
    projection[field] = 1;

    person.find({}, projection)
        .then(data => {
            console.log(`Data for field ${field}:`, data); // Log the fetched data
            res.json(data);
        })
        .catch(err => {
            console.error(`Error fetching data for field ${field}:`, err); // Log the error
            res.status(500).json({ error: err.message });
        });
});


module.exports = router;