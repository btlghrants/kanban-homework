import React from 'react';

function Column({
  title,
  children,
}: Readonly<{
  title: string,
  children: React.ReactNode,
}>) {
  return (
    <div className={`bg-green-400 flex flex-col p-3 gap-3 rounded-lg min-w-96`}>
      <div className={`self-center`}>
        <span>
          {title}
        </span>
      </div>
      <div className={`flex flex-col gap-3`}>
        {children}
      </div>
    </div>
  );
}

export default Column;