import React from 'react';
import { FaDatabase } from 'react-icons/fa6';

export default function NoDataFound({
  displayText,
  size = 30,
}: {
  displayText: string;
  size?: number;
}) {
  return (
    <>
      <div className="text-center w-full">
        <FaDatabase className="mx-auto" size={size} />
        <p className="mt-2">{displayText}</p>
      </div>
    </>
  );
}
