import { Navigate } from "react-router-dom";


export default function AuthRoutes(props) {
  if (localStorage.getItem("token") === null) {
    return props.children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
}
