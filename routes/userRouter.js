const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const checkToken = require('../checkToken');

// private route
router.post('/me', checkToken, async (req, res) => {

    const {id} = req.body;

    // check if user exists
    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({message: 'User Not Found'});
    }

    res.status(200).json({ user });
});

// GET USER BY ID
router.get('/:id', checkToken, async (req, res) => {

    const id = req.params.id;

    // check if user exists
    const user = await User.findById(id, '-password');

    if (!user) {
        return res.status(404).json({message: 'User Not Found'});
    }

    res.status(200).json({ user });
});


// REGISTER USER
router.post('/signup', async (req, res) => {
 
    const {name, email, password, confirmPassword, address, zipcode, city, phone} = req.body;

    // validation
    if(!name) {
        return res.status(422).json({message: 'The name is required'})
    }

    if(!email) {
        return res.status(422).json({message: 'The email is required'})
    }

    if(!password) {
        return res.status(422).json({message: 'The password is required'})
    }

    if(password !== confirmPassword) {
        return res.status(422).json({message: 'Passwords do not match.'})
    }

    // check if user exists
    const userExists = await User.findOne({ email: email});

    if (userExists) {
        return res.status(422).json({message: 'Email already registered. Use another one.'})
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
        name,
        email,
        password: passwordHash,
        address,
        zipcode,
        city,
        phone,
    })

    try {
        await user.save();

        res.status(201).json({message: 'User Created.'})
    } catch (error) {
        console.log(error)

        res.status(500).json({message: 'Server Error.'})
    }
});

// USER LOGIN
router.post('/signin', async (req, res) => {
    const { email, password} = req.body;

    if(!email) {
        return res.status(422).json({message: 'The email is required'})
    }

    if(!password) {
        return res.status(422).json({message: 'The password is required'})
    }

    const user = await User.findOne({ email: email});

    if (!user) {
        return res.status(404).json({message: 'User Not Found,'})
    }

    // CHECK IF PASSWORD MATCH
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
        return res.status(422).json({message: 'Invalid Password'})
    }

    try {

        const secret = process.env.secret;

        const token = jwt.sign(
            {
            id: user._id,
            },
            secret
        )
        res.status(200).json({ message: 'Authentication successful', token})
    } catch (error) {
        console.log(error)

        res.status(500).json({message: 'Server Error.'})
    }

});

module.exports = router;