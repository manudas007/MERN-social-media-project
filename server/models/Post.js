import mongoose from "mongoose";
// type: Map: It specifies the data type of the likes
//  field. Here, it's declaring that likes will be of type Map.
//   A Map is a data structure in JavaScript that stores key-value pairs.
//    In this case, it implies that likes will be structured as a Map.

// of: Boolean: This line, within the likes definition, 
// indicates the type of values that will be stored within the Map.
//  It's specifying that the values in this Map will be of type Boolean.
const postSchema= mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,

        },
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        location:String,
        description: String,
        picturePath:String,
        userPicturePath: String,
        likes:{
            type:Map,
            of:Boolean,
        },
        comments:{
            type:Array,
            default:[]
        }

    },
    {timestamps: true}
)

const Post =mongoose.model("Post",postSchema);

export default Post;