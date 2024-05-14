import React, { ReactNode } from "react";
import Avatar from "./Avatar";

type ChatBubbleProps = {
  title: string;
  logo: string;
  alt: string;
  child?: ReactNode;
};

const ChatBubble: React.FC<ChatBubbleProps> = (props: ChatBubbleProps) => {
  const { logo, title, alt, child } = props;
  return (
    <div className="chat-message my-4 w-full">
      <div className="flex items-end my-2">
        <Avatar className="avatar" path={logo} alt={alt} />
        <p className="mx-2 font-bold text-base text-gray-500">{title}</p>
      </div>
      <div className="flex flex-col space-y-2 text-xs ml-10 mr-2 my-2 overflow-x-wrap rounded-lg">
        {child}
      </div>
    </div>
  );
};

export default ChatBubble;
