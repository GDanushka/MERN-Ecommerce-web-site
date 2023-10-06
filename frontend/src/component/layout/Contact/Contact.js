import React from "react";
import "./Contact.css";
import EmailIcon from '@material-ui/icons/Email';
import { Typography } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <div className="contactContainerBox">
        <Typography component="h2">CONTACT ME</Typography>
       <div>
          <a href="mailto:test@gmail.com" target="_blank" rel="noopener noreferrer">
            <EmailIcon className="SvgIcon" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;