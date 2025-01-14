import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is Required!"]
    },
    username: {
        type: String,
        required: [true, 'Username is Required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, It should containe 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
})

const User = models.user || model("User", userSchema);

export default User