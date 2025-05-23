import mongoose from "mongoose";

 const messageSchema = new mongoose.Schema({
     senderType: {
         type: String,
         enum: ["user", "bot"],
         required: true
      },
     message: {
         type: String,
         required: true
     }
     // createAt, updateAt
 }, {timestamps: true});

 const Message = mongoose.model("Message", messageSchema);

 export default Message;