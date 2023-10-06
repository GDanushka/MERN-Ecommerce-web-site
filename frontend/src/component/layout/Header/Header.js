import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import './Header.css';
import { MdAccountCircle, MdSearch, MdAddShoppingCart } from "react-icons/md";

const options = {
  burgerColorHover: "#F1F0E8",
  burgerColor: "#F1F0E8",
  logo,
  logoWidth: "20vmax",
  navColor1: "#000000",
  logoHoverSize: "10px",
  logoHoverColor: "#F1F0E8",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "#F1F0E8",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#ffcc00",
  link1Margin: "1vmax",
  profileIcon: true,
  profileIconColor: "F1F0E8",
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: "F1F0E8",
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: "F1F0E8",
  CartIconElement: MdAddShoppingCart,
  profileIconColorHover: "#ffcc00",
  searchIconColorHover: "#ffcc00",
  cartIconColorHover: "#ffcc00",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
