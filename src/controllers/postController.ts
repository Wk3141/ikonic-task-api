var postModal = require("../modal/post");
exports.getPosts = async function (req: any, res: any, next: any) {
  try {
    const posts = await postModal.find({}).populate("userID");
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.createPost = async function (req: any, res: any, next: any) {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const newPost = await postModal.create({
        title :title,
        description : description,
        userID :req.userID
    });
    
    res.status(200).json({ newPost: newPost,  desc :"Create post successfully"  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



exports.getpostByID = async function (req: any, res: any) {
  const { id } = req.params;
  try {
    const singlePost = await postModal.findById({_id:id});
    if (!singlePost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(singlePost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updatePostByID = async function (req: any, res: any) {
  try {

  
    const { id } = req.params;
    const { title,description} = req.body;

    const singlePost = await postModal.findById(id);
    if (!singlePost) {
      return res.status(404).json({ desc: "Post not found" });
    }


    if (title) {
        singlePost.title = title;
    }

  if(description){
        singlePost.description = description;

    }
    const updatedPost= await singlePost.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ desc: "Error updating user" });
  }
};

// // //  Delete user by post

exports.deletePostByID = async function (req: any, res: any) {
  const id = req.params.id;

  try {
       const deletedPost = await postModal.findByIdAndDelete(id);
        if (!deletedPost) {
          return res.status(404).json({ desc: "Post not found" });
        }

        res.status(200).json({ desc: "Post deleted successfully", deletedPost });
      } catch (error) {
        res.status(500).json({ desc: "Something went wrong", error });
      }
};
