"use client";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import { FacebookColored, GmailColored, XColored } from "./icons";

export const ShareButton = () => {
  return (
    <div className="flex flex-row gap-6">
      <FacebookShareButton url={window.location.href} hashtag="eejii">
        <div className="h-12 w-12 bg-white rounded-full border cursor-pointer flex items-center justify-center">
          <FacebookColored />
        </div>
      </FacebookShareButton>
      {/* <div className="p-3 bg-white rounded-full border cursor-pointer">
        <InstagramColored />
      </div> */}
      <TwitterShareButton url={window.location.href}>
        <div className="h-12 w-12 bg-white rounded-full border cursor-pointer flex items-center justify-center">
          <XColored />
        </div>
      </TwitterShareButton>
      <EmailShareButton url={window.location.href}>
        <div className="h-12 w-12 bg-white rounded-full border cursor-pointer flex items-center justify-center">
          <GmailColored />
        </div>
      </EmailShareButton>
    </div>
  );
};
