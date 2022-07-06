const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'ashishsingh$123';

//Route:1 -  create a user using : POST "/api/auth/". Doesn't require /api/auth/createuser.  no login required.
router.post('/createuser', [
     body('name', 'Enter the valid name').isLength({ min: 3 }),
     body('email', 'Enter the valid email').isEmail(),
     body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
     let success = false;
     // if there are errors , return Bad request and the errors
     
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
     }
     //    check whether the user with this email exists already
     try {
          let user = await User.findOne({ email: req.body.email });
          if (user) {
               return res.status(400).json({ success, errors: "sorry a user with this email already exists" });
          }
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(req.body.password, salt);
          //  create a new user
          user = await User.create({
               name: req.body.name,
               password: secPass,
               email: req.body.email,
          })
          //    }).then(user=>res.json(user))
          //    .catch(err=> {console.log(err)
          //      res.json({error: "please enter the unique value ", message: err.message})});
          const data = {
               user: {
                    id: user.id
               }
          }
          const jwtData = jwt.sign(data, JWT_SECRET);
          //    console.log(jwtData);
          success = true;
          res.json({ success, jwtData });
     } catch (error) {
          console.error(error.message);
          res.status(500).send("some error occured");
     }
})

// Route: 2 - authenticate a user using: POST "/api/auth/login". no login required
router.post('/login', [
     body('email', 'Enter the valid email').isEmail(),
     body('password', 'Password cannot be blanked').exists(),
], async (req, res) => {
     let success = false;
     // if there are errors , return Bad request and the errors

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { email, password } = req.body;
     try {
          let user = await User.findOne({ email })
          if (!user) {
               success = false;
               return res.status(400).json({ error: "Please try to login with correct credentials" });
          }
          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
               success = false;
               return res.status(400).json({success, error: "Please try to login with correct credentials" });

          }
          const data = {
               user: {
                    id: user.id
               }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({ success, authtoken });
     } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error");
     }
})

// Route:3 - Get loggedin user Details using : POST "/api/auth/getuser" . Login required

router.post('/getuser', fetchuser, async (req, res) => {
     try {
          userId = req.user.id;
          const user = await User.findById(userId).select("-password")
          res.send(user);
     } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error");
     }
})
module.exports = router;
