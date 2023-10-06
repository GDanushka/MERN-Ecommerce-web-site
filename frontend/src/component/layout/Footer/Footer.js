import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="midFooter">
        <div>
        <h1>IPROJECT</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2023 &copy; Gayan Danushka</p>
        </div>
      </div>

      <div className="rightFooter">
        <div>
          <Link to="...">
        <p>
          <InstagramIcon />
        </p>
      </Link>
      <Link to="...">
        <p>
          <YouTubeIcon />
        </p>
      </Link>
      <Link to="...">
        <p>
          <FacebookIcon />
        </p>
      </Link>
        <Link to="...">
        <p>
          <LinkedInIcon />
        </p>
          </Link>
        </div>
      
        </div>
    </footer>
  );
};
export default Footer;

