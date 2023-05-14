import mongoose from 'mongoose';

export interface CommentDocument extends mongoose.Document {
  comment: string;
  userID : mongoose.Types.ObjectId;
 }

const commentSchema = new mongoose.Schema<CommentDocument>({
    comment: { type: String, required: true, unique: true }, 
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },

});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;