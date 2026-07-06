import mongoose, { model, models, Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["candidate", "admin", "employer"],
        default: "candidate"
    },


},
    { timestamps: true }
)
export default models.User || model("User", userSchema);