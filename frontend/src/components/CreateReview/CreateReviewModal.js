import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/reviews";
import "./CreateReview.css";

function CreateReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  //STARS SHOULD BE SENT
  //STAR RATING IS JUST FOR SHOW
  const [stars, setStars] = useState(0);
  const [starRating, setStarRating] = useState(0);
  const { closeModal } = useModal();
  const disabled = false;
  //Dispatch to store with corresponding spotId and create the review
  const onSubmit = (e) => {
    //Should we async?
    e.preventDefault();
    const reviewData = {
      review,
      stars, //Should this be Stars?
    };

    dispatch(createReview(reviewData, spotId));
    closeModal();
  };

  const onClick = (number) => {
    setStars(number);
  };

//   useEffect(() => {
//     setStars(stars);
//   }, [stars])
  console.log('stars', stars);
  console.log('Actual star rating', starRating)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>How was your stay?</h1>
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></input>
        <div className="starRating">
          <div className={starRating >= 1 ? "filled" : "empty"}>
            <i
              className="fa-regular fa-star"
              onClick={() => onClick(1)}
              onMouseEnter={() => {
                if (!disabled) setStarRating(1);
              }}
              onMouseLeave={() => {
                if (!disabled) setStarRating(stars);
              }}
            ></i>
          </div>
          <div className={starRating >= 2 ? "filled" : "empty"}>
            <i
              className="fa-regular fa-star"
              onClick={() => onClick(2)}
              onMouseEnter={() => {
                if (!disabled) setStarRating(2);
              }}
              onMouseLeave={() => {
                if (!disabled) setStarRating(stars);
              }}
            ></i>
          </div>
          <div className={starRating >= 3 ? "filled" : "empty"}>
            <i
              className="fa-regular fa-star"
              onClick={() => onClick(3)}
              onMouseEnter={() => {
                if (!disabled) setStarRating(3);
              }}
              onMouseLeave={() => {
                if (!disabled) setStarRating(stars);
              }}
            ></i>
          </div>
          <div className={starRating >= 4 ? "filled" : "empty"}>
            <i
              className="fa-regular fa-star"
              onClick={() => onClick(4)}
              onMouseEnter={() => {
                if (!disabled) setStarRating(4);
              }}
              onMouseLeave={() => {
                if (!disabled) setStarRating(stars);
              }}
            ></i>
          </div>
          <div className={starRating >= 5 ? "filled" : "empty"}>
            <i
              className="fa-regular fa-star"
              onClick={() => onClick(5)}
              onMouseEnter={() => {
                if (!disabled) setStarRating(5);
              }}
              onMouseLeave={() => {
                if (!disabled) setStarRating(stars);
              }}
            ></i>
          </div>
        </div>
        <button type="submit">Submit Your Review</button>
      </form>
    </div>
  );
}

export default CreateReviewModal;
