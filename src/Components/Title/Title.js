import defaultImage from '../../assets/images/404.png'


export const Title = ({ title, image }) => {
  return (
    <div>
      {image === undefined ? (
        <img src={ defaultImage } alt="..." />
      ) : (
        <img src={image.default} alt="..." />
      )}
      <h1 style={{textAlign: "center"}}>{title}</h1>
    </div>
  );
};
