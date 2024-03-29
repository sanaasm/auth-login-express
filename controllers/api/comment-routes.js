const router = require('express').Router();
const { User, Post,Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',async(req,res) =>{
    try {
        const commentData = await Comment.findAll({include:[{ all: true, nested: true }]});
        res.status(200).json(commentData);
      } catch (err) {
        res.status(500).json(err);
      }

});

router.get('/:id',async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});




router.post('/',withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      comment:req.body.comment,
      post_id:req.body.post_id,
      user_id: req.session.user_id,
    });

    req.session.save(() => {
      res.status(200).json(dbCommentData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});





module.exports = router;