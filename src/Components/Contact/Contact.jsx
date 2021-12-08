import { useEffect, useState } from "react";
import { Title } from "../Title/Title";
import mockData from "../../lib/mock/contactData.json";

import "./Contact.scss";

const Contact = () => {
  const [contactData, setContactData] = useState(mockData);

  const getContactData = () => {
    //   to implement
  };

  useEffect(() => {
    getContactData();
  }, []);

  return (
    <div className="contact__container">
      <Title title="Contacto" />
      <div>
        <div>
          <i className="fas fa-envelope"></i>
          {contactData.mail}
        </div>
        <div>
          <i className="fab fa-instagram"></i>
          {contactData.instagram}
        </div>
        <div>
          <i className="fab fa-facebook-f"></i>
          {contactData.facebook}
        </div>
        <div>
          <i className="fas fa-phone-alt"></i>
          {contactData.phone}
        </div>
      </div>
    </div>
  );
};

export default Contact;
