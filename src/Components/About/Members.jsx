import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get } from "../../Services/privateApiService";
import { fetchMembers } from "../../store/slices/aboutSlice";
import LoaderComponent from "../Loader/Loader";
import "./styles/members.scss";

const Members = () => {
  const { aboutData } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const data = await Get('members')
      
    }
    getData()
    dispatch(fetchMembers());
  }, []);

  return (
    <div className="container">
      {aboutData.loading ? (        
        <LoaderComponent />
      ) : (
        aboutData.data.map((item) => (
          <div className="card" key={item.id}>
            <figure>
              <img src={item.image} alt="imagen" />
            </figure>
            <div className="card__container">
              <h4 className="card__title">{item.name}</h4>
              <h3 className="card__description">{item.description}</h3>
              <div className="links">
                <a
                  className="card__description"
                  href={item.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>

                <a
                  className="card__description"
                  href={item.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Members;
