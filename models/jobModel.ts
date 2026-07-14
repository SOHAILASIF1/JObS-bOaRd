import { model, models, Schema } from "mongoose";
const jobModel=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    salary:Number,
    location:String,
    category:String,
    employerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending",

    }
},{timestamps:true})
export default models.Job||model("Job",jobModel)

















