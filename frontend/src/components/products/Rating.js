import React from "react";

const Rating = (props) => {
  const { rating, numberOfRatings } = props;
  return (
    <div className='rating'>
      <span>
        <i
          className={
            rating >= 1
              ? "fa-solid fa-star"
              : rating >= 0.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? "fa-solid fa-star"
              : rating >= 1.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? "fa-solid fa-star"
              : rating >= 2.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? "fa-solid fa-star"
              : rating >= 3.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? "fa-solid fa-star"
              : rating >= 4.5
              ? "fa-solid fa-star-half-stroke"
              : "far fa-star"
          }
        ></i>
      </span>
      {numberOfRatings && <span> from {numberOfRatings} reviews</span>}
    </div>
  );
};

export default Rating;
