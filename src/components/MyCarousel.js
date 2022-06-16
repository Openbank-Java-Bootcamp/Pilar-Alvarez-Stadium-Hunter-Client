import { Carousel } from "react-bootstrap";

function MyCarousel(props) {
  return (
    <Carousel variant="dark" className="carrusel">
      {props.reviews.map((rev) => {
        return (
          <Carousel.Item key={rev.id} className="blankSpace">
            <Carousel.Caption>
              <h5>
                <em>"{rev.comment}"</em>
              </h5>
              <p>-Hunter {rev.user.name}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
      {props.reviews.length == 0 && (
        <Carousel.Item className="blankSpace">
          <Carousel.Caption>
            <h4>
              <em>"NO REVIEWS TO SHOW"</em>
            </h4>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
}

export default MyCarousel;
