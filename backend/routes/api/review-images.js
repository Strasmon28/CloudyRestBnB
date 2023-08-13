const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review, ReivewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { route } = require('./session');

//Delete a Review Image
router.delete('/:imageId', requireAuth, async(req, res) => {
    const imageId = req.query.imageId;
    const userId = req.user.id;

    const deletedImage = await ReivewImage.findByPk(imageId);

    const checkReview = await ReivewImage.findByPk(imageId, {
        include: {
            model: Review
        }
    });

    if(!deletedImage){
        res.status(404);
        res.json({
            message: "Review Image couldn't be found"
        })
    }

    //Authorization (use the image id and connect the dots?)
    if (checkReview.Review.userId !== userId){
        res.status(403);
        res.json({
            message: "Forbidden"
        })
    }

    deletedImage.destroy();

    res.status(200);
    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router