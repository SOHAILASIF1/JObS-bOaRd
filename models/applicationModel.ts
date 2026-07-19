import { model, models, Schema } from "mongoose";

const applicationSchema=new Schema({
    jobId:{
        type:Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    candidateId:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    resumeLink:{type:String,required:true},
    status:{
        type:String,
        enum:["pending","rejected","shortlisted","hired"],
        default:"pending"
    }
},{timestamps:true});


applicationSchema.index({jobId:1,candidateId:1},{unique:true})
export default models.Application||model("Appliction",applicationSchema)