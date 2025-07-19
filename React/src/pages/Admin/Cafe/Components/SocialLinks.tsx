import React from "react";
import cx from "../CafeDescription.module.scss";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const socialLinks = [
  {
    icon: <FaFacebookF />,
    placeholder: "Facebook Link",
    name: "facebookLink",
  },
  {
    icon: <AiFillInstagram />,
    placeholder: "Instagram Link",
    name: "instagramLink",
  },
  {
    icon: <AiOutlineTwitter />,
    placeholder: "Twitter Link",
    name: "twitterLink",
  },
  {
    icon: <FaLinkedinIn />,
    placeholder: "LinkedIn Link",
    name: "linkedinLink",
  },
];

const SocialLinks = ({ cafeData, edit, handleChange }: any) => {
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Social Media Links</h4>
      </div>
      <ul className={cx.socialLinks}>
        {socialLinks.map((item: any, index: number) => {
          return (
            <li key={index}>
              <span>{item.icon}</span>
              <input
                type="text"
                disabled={edit}
                value={cafeData?.[item.name] ? cafeData?.[item.name] : ""}
                name={item.name}
                placeholder={item.placeholder}
                onChange={(e: any) => handleChange({ e })}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SocialLinks;
