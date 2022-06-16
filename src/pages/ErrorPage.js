import pageError from "../images/PageError.png";
const imgURL =
  "https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-routing/404.gif";

function ErrorPage() {
  return (
    <div className="error">
      <img src={pageError} alt="404 error" width={600} />
    </div>
  );
}

export default ErrorPage;
