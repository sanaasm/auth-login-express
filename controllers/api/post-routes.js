const router = require('express').Router();
const { User, Post,Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',async(req,res) =>{
    try {
      //  const postData = await Post.findAll({include:[{ all: true, nested: true }]});
       const postData = await Post.findAll({include:[{ all: true, nested: true }]});
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }

});


router.get('/:id',withAuth,async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// CREATE new post
router.post('/',withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    req.session.save(() => {
      res.status(200).json(dbPostData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;