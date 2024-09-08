import style from "./NotFound.module.css";
import Not from "../../assets/4730712_2488756.jpg";
export default function NotFound() {
  return (
    <>
      <div className="container  h-screen  flex justify-center items-center mx-auto">
        <img src={Not} alt="Error image" className="min-w-full  h-screen" />
      </div>
    </>
  );
}
