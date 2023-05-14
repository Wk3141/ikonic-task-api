import mongoose, { ObjectId } from 'mongoose';

export interface PostDocument extends mongoose.Document {
  title: string;
  description : string;
  userID : mongoose.Types.ObjectId;
 }

const commentSchema = new mongoose.Schema<PostDocument>({
    title: { type: String }, 
    description: { type: String }, 
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  

});

const Post = mongoose.model('Post', commentSchema);

module.exports = Post;