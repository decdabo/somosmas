import { Title } from "../Title/Title";
import "./styles/AboutMain.scss";

export const AboutMain = ({
  about = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
}) => {
  return (
    <div>
      <Title title={"Nosotros"} />
      <div className="about-container">
     
          <h3>Sobre Nosotros:</h3>
       
        <div>{about}</div>
      </div>
    </div>
  );
};
