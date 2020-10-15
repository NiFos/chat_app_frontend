/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../../components/button";
import { Divider } from "../../components/divider";
import { authQuery } from "../../graphql/queries/auth.query";
import { getAccessToken } from "../../lib/apolloClient";
import { authPagePath } from "../auth-page";
import { chatPagePath } from "../chat-page";

export const homePagePath = `/`;
interface Props {}

export function HomePage(props: Props) {
  const history = useHistory();
  const [getUserId, userIdData] = useLazyQuery(authQuery.GET_USER_ID);
  const features = ["Groups", "Find users"];

  React.useEffect(() => {
    getUserId();
  }, []);
  React.useEffect(() => {
    if (
      !userIdData.loading &&
      !userIdData.error &&
      userIdData.data?.me?.userId
    ) {
      history.push(chatPagePath);
    }
  });
  return (
    <div className="container mx-auto flex flex-col md:w-3/12 pl-3 pr-3 text-center">
      <h1 className="text-4xl">Chat app</h1>
      <Link to={authPagePath} className="">
        <Button className="bg-blue-400 text-white rounded pl-2 pr-2 pt-1 pb-1">
          Log in / Register
        </Button>
      </Link>
      <Divider />
      <h4 className="text-lg">Features</h4>
      <ul>
        {features.map((item) => (
          <li className="" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
