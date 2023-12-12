import User from "../models/User.js";
// READ ------------
export const getUser = async (req,res)=>{
    try{
        const {id}=req.parms;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}
export  const getUserFriends = async(req,res)=>{
    try{
        const {id}= req.parms;
        const user = await User.findById(id);
        /* Promise.all: It's used to concurrently execute multiple promises.
         In this case, it fetches information about each friend of the user.
         Input: You provide an array of promises to Promise.all().
            Execution: It concurrently executes all these promises.
            Waiting: It waits for all the promises to settle (resolve or reject).
            Returns:
         */
        const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        /* 
        This code segment essentially takes an array of friend objects (friends),
         extracts specific properties from each friend object, and creates a new array (formattedFriends)
         with objects containing only those extracted properties. This new array
          is then used for further processing or sending as a response in the 
          context of the surrounding code.*/
        const formattedFriends=friends.map(
            ({_id,firstname,lastname,occupation,location,picturepath})=>{
                return{_id,firstname,lastname,occupation,location,picturepath};
            }
        );
        res.status(200).json(formattedFriends);
    }catch(err){
        res.status(404).json({message:err.message})
    }


}
// UPDATE -------------------
export const addRemoveFriend =async (req,res)=>{
    try{
        const {id,friendId}=req.params;
        const user = await User.findById(id);
        const friend = await User.friendById(friendId);
        /*
        Checking and Modifying Friend Relationship:

        Checks if the users are already friends.
        If they are friends (user.friends includes friendId):
        Removes the friendId from the user's friends list (user.friends).
        Removes the id from the friend's friends list (friend.friends).
        If they are not friends:
        Adds friendId to the user's friends list.
        Adds id to the friend's friends list.

        */
        if(user.friends.includes(friendId)){
            /*
            
                 const numbers = [1, 2, 3, 4, 5, 6];

                const evenNumbers = numbers.filter((number) => number % 2 === 0);

                console.log(evenNumbers);
            
            
            */
            user.friends = user.friends.filter((id)=> id !== friendId);
            friend.friends = friend.friends.filter((id)=> id !==id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formattedFriends=friends.map(
            ({_id,firstname,lastname,occupation,location,picturepath})=>{
                return{_id,firstname,lastname,occupation,location,picturepath};
            }
        );
        res.status(200).json(formattedFriends)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}