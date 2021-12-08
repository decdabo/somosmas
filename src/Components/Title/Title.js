import defaultImage from "../../assets/images/404.png";

export const Title = ({ title, image }) => {
  return (
    <div>
      <img src={!image ? defaultImage : image} alt="" />
      <h1 className="main-title">{title}</h1>
    </div>
  );
};
