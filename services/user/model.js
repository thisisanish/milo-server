
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true,'Fullname is  required']
  },
  title: {
    type: String,
    required: [true,'Fullname is  required']  
  },
  email: {
    type: String,
    required: [true,'Email is required'],
    unique: true
  },
  verified:{
    type: Boolean,
    // required: [true, "verified is required"],
    default: false
  },
  summary: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length <= 140
      },
      message: (props) => {
        console.log({summaryProps:props});
        return `Summary should not be greate than 100 characters`
      }
    },
    // min: [140, 'Summary should be less than 100'],
  },
  university: {
    type: String
  },
  avatar: {
    type: String
  },
  // blogs: [{
  //   type: mongoose.Schema.Types.ObjectId,
  // }]
},{ timestamps: true });

const User = mongoose.models['user'] || mongoose.model('user', userSchema);
export default User;