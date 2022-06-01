import React, { useState } from "react";

export const useOnline = () =>  {
    const [isOnline, setIsOnline] = useState(false)
    return isOnline

}