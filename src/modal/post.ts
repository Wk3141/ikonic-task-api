import mongoose, { ObjectId } from 'mongoose';

export interface PostDocument extends mongoose.Document {
  title: string;
  description : string;
  userID : mongoose.Types.ObjectId;
  createdAt: Date;
 }

const commentSchema = new mongoose.Schema<PostDocument>({
    title: { type: String }, 
    description: { type: String }, 
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }


  

});

const Post = mongoose.model('Post', commentSchema);

module.exports = Post;