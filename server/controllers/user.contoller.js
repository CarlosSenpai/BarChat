const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require(`jsonwebtoken`);

module.exports = {

    register: (req, res) => {
        //use the req data and the User model constructor to create a user object

        const user = new User(req.body);

        //inbn fo is already in the instance of THIS object. no need to pass anything in.
        //save is an instance method, odesn't require anything passed in
        //create is static and takes the object as the parameter

        user.save()
            .then((newUser) => {
                console.log(newUser);
                console.log("Successfully Registered");
                res.json({
                    successMessage: "Thank you for registering", 
                    user: newUser
                });
            })
            .catch( (err) => {
                console.log("Register not successful")
                res.status(400).json(err);
            })
    },

    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then((userRecord) => {
                //check if this returned obj is null
                if(userRecord === null){
                    //email not found
                    res.status(400).json({message: "Invalid login attempt"})
                } else {
                    //email is found
                    bcrypt.compare( req.body.password, userRecord.password) //returns a boolean
                        .then( (isPasswordValid) => {

                            if(isPasswordValid){

                            console.log("Password is valid");

                            const userToken = jwt.sign(
                                { //payload is data we want to svae
                                    _id: userRecord._id,
                                    email: userRecord.email,
                                    name: userRecord.firstName
                                },
                                //We need a key to sign and hash cookie's data. Our payload needs a secret key.
                                process.env.JWT_SECRET
                            );
                            res.status(201).cookie('userToken', userToken, {
                                expires: new Date(Date.now() + 10000000),
                            }).json({successMessage: 'user created', user: {
                                _id: userRecord._id,
                                email: userRecord.email,
                                name: userRecord.firstName
                            }})
                                
                            } else {
                                res.status(400).json({
                                    message: "Login and/or Email Invalid"
                                })
                            }
                        })
                        .catch( (err) =>{
                            console.log(err);
                            res.status(400).json({ message: "Invalid Attempt "});
                        })
                }
            })
            .catch( (err) => { 
                console.log(err);
                res.status(400).json({ message: "Invalid Attempt "});
            })
    },

    logout: (req, res) => {
        console.log("Logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out"
        });
    },

    getOneUser: (req, res) => {
        User.findOne({_id: req.params.id })
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    deleteOneUser: (req, res) => {
        User.findByIdAndDelete({_id: req.params.id})
            .then((deleteTest) => {
                console.log(deleteTest);
                res.json(deleteTest);
            })
            .catch( (err) => {
                console.log("Delete one test failed");
                res.json({message: "Something went wrong when deleting", error: err})
            })
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            .then( (updateUser) => {
                console.log(updateUser);
                res.json(updateUser);
            })
            .catch( (err) => {
                res.json({message: "couldn't update: ", error: err})
            })
    },

    getLoggedInUser: async (req, res) => {
        try {
        const userPayLoad = await jwt.verify(req.cookies.userToken, JWT_SECRET)
        console.log('User', user)
        const user = await User.findOne({_id: userPayLoad._id});
        res.json(user);
    } catch (err) {
        console.log('Error in getting user', err);
        res.status(400).json({err});
    }
    },

    // setLocation: (req, res) => {
    //     User.find({
    //         location: {
    //             $near: {
    //                 $maxDistance: 1000,
    //                 $geometry: {
    //                     type: "Point",
    //                     coordinates: [long, latt]
    //                 }
    //             }
    //         }
    //     }).find( (error, res) => {
    //         if(error) {
    //             console.log(error);
    //             console.log(JSON.stringify(res, 0, 2));
    //         }
    //     })
    // }
};


// res.cookie(
//     "usertoken",
//     jwt.sign(
//     { //payload is data we want to svae
//         id: userRecord._id,
//         email: userRecord.email,
//         name: userRecord.firstName
//     },
//     //We need a key to sign and hash cookie's data. Our payload needs a secret key.
//     process.env.JWT_SECRET

//     ),
//     {
//         httpOnly: true,
//         expires: new Date(Date.now() + 9000000)
//     },
// ).json({
//     message: "Successfully Logged In",
//     userLoggedIn: userRecord.username,
//     userId: userRecord._id
// });