import React from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <>
      <div className="footer p-5 d-flex justify-content-around align-items-start mt-5">
        <div className="col-3">
          <h4>Contact Us</h4>
          <div>
            <p>
              <Icon icon="heroicons:map-pin-20-solid" width={20} /> Address :
              lorem ipsum
            </p>
            <p>
              <Icon icon="carbon:phone-filled" width={20} /> Phone :
              081234567890
            </p>
            <p>
              <Icon icon="mi:email" width={20} /> Email: admin@gmail.com
            </p>
          </div>
        </div>
        <div className="col-4 text-center">
          <h2>SISTEM TOKO</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <div className="mt-4">
            <a href="#" className="px-3" target="_blank">
              <Icon icon="ant-design:facebook-filled" />
            </a>
            <a href="#" className="px-3" target="_blank">
              <Icon icon="fe:twitter" />
            </a>
            <a href="#" className="px-3" target="_blank">
              <Icon icon="fa:instagram" />
            </a>
            <a href="#" className="px-3" target="_blank">
              <Icon icon="uil:linkedin" />
            </a>
          </div>

          <hr />
          <p>2023 Allright Reserved. Design by Eduwork.com</p>
        </div>
        <div className="col-3">
          <h4>Best Product</h4>
          <div>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
