var commentModal = require("../modal/comment");
var User = require("../modal/comment");

exports.getComments = async function (req: any, res: any, next: any) {
  try {
    const comments = await commentModal.find({});
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create all comment from database

exports.createComment = async function (req: any, res: any, next: any) {
  try {
    const comment = req.body.comment;
    // Storing data in db via mongoose User model
    const newComment = await commentModal.create({
      comment :comment,
      userID :req.userID
    });
    
    res.status(201).json({ newComment: newComment, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// // Get single user by email

exports.getCommentByID = async function (req: any, res: any) {
  const { id } = req.params;
  try {
    const singleComment = await commentModal.findById({_id:id});
    if (!singleComment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res.status(200).json(singleComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.updateCommentByID = async function (req: any, res: any) {
  try {
    const { id } = req.params;
    const { comment} = req.body;
    const singleComment = await commentModal.findById(id);
    if (!singleComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment) {
      singleComment.comment = comment;
    }
    const updatedComment = await singleComment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};


exports.deleteCommentByID = async function (req: any, res: any) {
  const id = req.params.id;

  try {
       const deletedComment = await commentModal.findByIdAndDelete(id);
        if (!deletedComment) {
          return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully", deletedComment });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
      }
};
