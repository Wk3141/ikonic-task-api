import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  name:string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, },  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true , default:"user" },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
