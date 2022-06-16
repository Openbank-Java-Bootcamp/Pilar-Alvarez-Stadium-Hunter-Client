import { Carousel } from "react-bootstrap";

function MyCarousel(props) {
  return (
    <Carousel variant="dark">
      {props.reviews.map((rev) => {
        return (
          <Carousel.Item key={rev.id}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Carousel.Caption>
              <h5>
                <em>"{rev.comment}"</em>
              </h5>
              <p>-Hunter {rev.user.name}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default MyCarousel;
