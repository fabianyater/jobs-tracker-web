import { Toast } from "flowbite-react";
import React from "react";

export type ToasterProps = {
  text: string;
};

const Toaster: React.FC<ToasterProps> = ({ text }) => {
  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
        <span className="h-5 w-5">✅</span>
      </div>
      <div className="ml-3 text-sm font-normal">{text}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default Toaster;
