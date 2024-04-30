// useCookie.js
import { useState, useEffect } from "react";

const useCookie = (name, initialValue) => {
  const [cookie, setCookieValue] = useState(() => {
    const value = getCookie(name);
    return value !== "" ? JSON.parse(value) : initialValue;
  });

  useEffect(() => {
    if (cookie !== initialValue) {
      setCookieValue(cookie);
    }
  }, [cookie, initialValue]);

  return [cookie, setCookieValue];
};


export default useCookie;