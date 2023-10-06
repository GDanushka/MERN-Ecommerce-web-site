import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';

import founderImage from "../../../images/my.png"; // Import the image using require

import "./aboutSection.css";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            {/* Use the imported image directly */}
            <Avatar
              style={{ width: "20vmax", height: "20vmax", margin: "2vmax 0" }}
              src={founderImage} // Use the imported image variable here
              alt="Founder"
            />
            <Typography>Gayan Danushka</Typography>
            <span>i project</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Find Me</Typography>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              <YouTubeIcon className="SvgIcon" />
            </a>
            <a href="https://linkdin.com/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon className="SvgIcon" />
            </a>
            <a href="https://linkdin.com/" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="SvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
