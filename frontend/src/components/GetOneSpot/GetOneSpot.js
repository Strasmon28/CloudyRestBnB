import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { singleSpot } from "../../store/spots";
import { allReviews } from "../../store/reviews";
import "./GetOneSpot.css";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReview/CreateReviewModal";
import DeleteReviewModal from "../DeleteReview/DeleteReviewModal";

//Should get all info of one spot and display its information
function GetOneSpot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  console.log(spotId);

  useEffect(() => {
    dispatch(singleSpot(spotId));
    dispatch(allReviews(spotId));
  }, [dispatch, spotId]);

  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spotsStore.spot);
  const reviews = useSelector((state) => state.reviewsStore.reviews);
  // const reviews = useSelector((state) => state.reviewsStore.reviews);
  console.log("REVIEWS", reviews);
  console.log(typeof reviews);
  // if(Object.keys(spot).length === 0){ //check this, object truthy returns falsy
  //     return null;
  // }

  const featureAlert = (e) => {
    e.preventDefault();
    window.alert("Feature coming soon");
  };

  if (!spot || !spot.Owner.firstName || !spot.Owner.lastName || !reviews) {
    return null;
  }

  let makeNewReview = (
     <OpenModalButton
      buttonText="Post your Review"
      modalComponent={<CreateReviewModal spotId={spot.id} />}
    ></OpenModalButton>
  );

  let firstReview = <p>Be the first to post a review!</p>
  //If no current user, cannot post a review
  if (!sessionUser) makeNewReview = null;

  //If there is a user, check to see if they own the spot
  //If they own it, prevent making a review
  if(sessionUser.id === spot.ownerId){
    makeNewReview = null;
    firstReview = null;
  }

  //Iterate through reviews of this spot to see if one matches, if so don't show the create button.
  reviews.forEach((review) => {
    if (sessionUser && (sessionUser.id === review.userId)) {
      makeNewReview = null;
    }
  });


  let reviewDot = null;
  let reviewCounter = null;
  if (reviews.length > 0) {
    reviewDot = <i className="fa-solid fa-circle fa-2xs"></i>;
    reviewCounter = (
      <p>
        {reviews.length} {reviews.length > 1 ? "Reviews" : "Review"}
      </p>
    );
    firstReview = null;
  }
  //if the review belongs to the user, show delete button
  //IF NO REVIEWS, SET TO "NEW"
  console.log("THE SPOT", spot);
  return (
    <div className="primary">
      <div className="secondary">
        <h1>{spot.address}</h1>
        <h2>
          {spot.city}, {spot.state}, {spot.country}
        </h2>
        <p>text placeholder: image goes here</p>
      </div>
      <div className="hosting">
        <h3>
          HOSTED BY {spot.Owner.firstName} {spot.Owner.lastName}{" "}
        </h3>
        <p>{spot.description}</p>
        <div className="reserve">
          separate block with...
          <p>${spot.price} night</p>
          <i className="fa-solid fa-star"></i>
          <p>{reviews.length > 0 ? spot.avgStarRating : "New"}</p>
          {reviewDot}
          {reviewCounter}
          <button onClick={featureAlert}>Reserve</button>
        </div>
      </div>
      <div className="reviewNumbers">
        <i className="fa-solid fa-star"></i>
        <p>{reviews.length > 0 ? spot.avgStarRating : "New"}</p>
        {reviewDot}
        {reviewCounter}
        {firstReview}
      </div>
      {makeNewReview}
      <div>
        {reviews.map((oneReview) => (
          <div key={oneReview.id}>
            <h3>{oneReview.User.firstName}</h3>
            <p>{oneReview.createdAt}</p>
            <p>{oneReview.review}</p>
            {sessionUser && (sessionUser.id === oneReview.userId) ? (
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteReviewModal reviewId={oneReview.id} />}
              ></OpenModalButton>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetOneSpot;
