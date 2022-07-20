const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    gender: {
        type: String,
        required: [true, "Please select a Gender"],
        //An enum will require this field's value in the request to
        //include one of these values exactlky as types here
        enum: [
            "Male",
            "Female",
            "Agender",
            "Cisgender",
            "Genderfluid",
            "Genderqueer",
            "Intersex",
            "Gender Nonconforming",
            "Transgender"
        ]
    },
    image: {
        type: String,
        
    }

    // location: {
    //     type: { type: String },
    //     coordinates: []
    // }
}, {timestamps: true});

//Virtual field
    //stores info from our req, but will not save to the
    //collection/db

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value)

UserSchema.pre("validate", function(next) {
    
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match")
        console.log("Passwords don't match")
    }
    next()
})

UserSchema.pre("save", function(next) {
    console.log("in pre save")
    //hash the password BEFORE it's saved to teh db
    //Remeber, we know they match from teh middleware above
    bcrypt.hash(this.password, 10)
        .then( (hashedPassword) => {
            //give our password the value of the returned hash
            this.password = hashedPassword;
            next()
        })
})

UserSchema.index({location: "2dsphere"});

const User = mongoose.model("User", UserSchema);

module.exports = User;