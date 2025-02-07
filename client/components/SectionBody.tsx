import React, { ReactNode } from 'react'

interface SectionBodyProps {
  title: string;
  children: ReactNode;
  button?: boolean; 
}

const SectionBody = ({ title, children, button }: SectionBodyProps) => {
  return (
    <section className="flex flex-col sm:px-1 px-6 mt-20 w-full">
      <div className="flex items-center justify-between px-4 py-1 border-l-[20px] border-red-600 rounded-l-lg mb-10">
        <span className="text-red-600 font-bold text-[20px]">{title}</span>
        {button && (
          <button className="px-5 py-3 rounded-md text-black border-2 border-gray-400 font-medium bg-transparent hover:bg-gray-200 duration-500 transition-colors">
            See all
          </button>
        )}
      </div>
      {children}
    </section>
  );
};
export default SectionBody;