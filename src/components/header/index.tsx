/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@apollo/client";
import React from "react";
import queryString from "query-string";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { authMutation } from "../../graphql/mutations/auth.mutation";
import { setAccessToken } from "../../lib/apolloClient";

interface Props extends RouteComponentProps {}

function HeaderComponent(props: Props) {
  const history = useHistory();
  const [setRefreshMutation, refreshMutationData] = useMutation(
    authMutation.REFRESH_TOKEN
  );
  React.useEffect(() => {
    const query = props.location.search;
    const params = queryString.parse(query);
    if (params && params.accessToken) {
      const accessToken = params.accessToken;
      setAccessToken(accessToken as string);
      localStorage.setItem("hasRefresh", "1");
      history.push("/chat");
    } else {
      const hasRefresh = !!localStorage.getItem("hasRefresh");
      console.log(localStorage.getItem("hasRefresh"));

      if (hasRefresh) {
        refreshHandler();
      }
    }
  }, []);
  async function refreshHandler() {
    await setRefreshMutation();
    if (
      !refreshMutationData.loading &&
      !refreshMutationData!.error &&
      refreshMutationData.data
    ) {
      const token = refreshMutationData.data.Refresh.refresh.accessToken;
      console.log("token", token);

      if (token) {
        setAccessToken(token);
        console.log("token", token);
      }
    }
  }
  return (
    <div className="bg-blue-400 w-auto flex justify-between">
      <div>
        <div>Chat App</div>
      </div>
      <div>User</div>
    </div>
  );
}

export const Header = withRouter(HeaderComponent);
