import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../store/slices/aboutSlice";
import LoaderComponent from "../Loader/Loader";
import "./styles/members.scss";

const Members = () => {
  const { aboutData } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
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
            <div className="content">
              <h4 className="content-title">{item.name}</h4>
              <h3 className="content-description">{item.description}</h3>
              <div className="links">
                <a
                  className="content-description link"
                  href={item.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>

                <a
                  className="content-description link"
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
