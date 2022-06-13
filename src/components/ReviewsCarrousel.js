import { useState } from "react";
import { Carousel } from "react-bootstrap";

function ReviewsCarrousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {props.reviews.map((rev) => {
        <Carousel.Item key={rev.id}>
          <Carousel.Caption>
            <h4>{rev.user.name}</h4>
            <p>{rev.comment}</p>
          </Carousel.Caption>
        </Carousel.Item>;
      })}
    </Carousel>
  );
}
export default ReviewsCarrousel;
