"use client";
import React, { useEffect } from "react";

const TawkTo: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/678ab778825083258e06fc7c/1ihqtpcjj";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);
    console.log("TawkTo script added");

    return () => {
      document.body.removeChild(script);
      console.log("TawkTo script removed");
    };
  }, []);

  return null;
};

export default TawkTo;
