
import mongoose from 'mongoose';



const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,'Fullname is  required']  
  },
  authorID: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: ''
    },
    content: {
      type: String,
      required: [true,'blog content is  required']  
    },
    description:  {
      type: String, 
    },
    tags: [{
      type: String
    }]
},{ timestamps: true });

const Blog = mongoose.models['blog'] || mongoose.model('blog', blogSchema);
export default Blog;