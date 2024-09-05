import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      Medicine Management System ©{new Date().getFullYear()} Created by Apotek
      Maju Mundur
    </AntFooter>
  );
};

export default Footer;
