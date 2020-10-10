import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export function HomePage(props: Props) {
  const features = ["Groups", "Find users"];
  return (
    <div className="container mx-auto flex flex-col w-3/12 text-center">
      <h1 className="text-4xl">Chat app</h1>
      <Link to="/auth" className="">
        <span className="bg-blue text-grey-600 rounded-2">
          Log in / Register
        </span>
      </Link>
      <div className="border-b-2 border-grey-600 mt-2 mb-2"></div>
      <h4 className="text-lg">Features</h4>
      <ul>
        {features.map((item) => (
          <li className="">{item}</li>
        ))}
      </ul>
    </div>
  );
}
