import { FaDatabase } from "react-icons/fa6";

import React from 'react';

const NoDataFound = () => {
    return (
        <div className="text-center">
            <FaDatabase className="text-gray mx-auto" />
            <p> No Data Found </p>
        </div>
    );
}

export default NoDataFound;
