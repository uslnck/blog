import { Result } from "antd";

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you requested does not exist."
    />
  );
}

export default NotFound;
