import React from 'react';

function Column({
  id,
  title,
  children,
}: Readonly<{
  id: number,
  title: string,
  children: React.ReactNode,
}>) {
  return (
    <div className={`bg-green-300 flex flex-col p-3 gap-3 rounded-lg min-w-96`}>
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