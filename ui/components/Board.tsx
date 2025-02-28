import React from 'react';

function Board({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`bg-red-400 size-full flex flex-row p-5 gap-3 rounded-lg overflow-auto`}>
      {children}
    </div>
  );
}

export default Board;