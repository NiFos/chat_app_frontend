/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@apollo/client";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { authMutation } from "../../graphql/mutations/auth.mutation";
import { setAccessToken } from "../../lib/apolloClient";

interface Props extends RouteComponentProps {
  children: any;
}

export function CheckLoginComponent(props: Props) {
  const [allowRender, setAllowRender] = React.useState(false);
  const [setRefreshMutation, refreshMutationData] = useMutation(
    authMutation.REFRESH_TOKEN
  );
  React.useEffect(() => {
    const hasRefresh = !!localStorage.getItem("hasRefresh");
    if (hasRefresh) {
      setAllowRender(true);
      setRefreshMutation();
    }
  }, []);

  React.useEffect(() => {
    if (
      !refreshMutationData.loading &&
      !refreshMutationData!.error &&
      refreshMutationData.data
    ) {
      const token = refreshMutationData.data.refresh.accessToken;
      setAccessToken(token);
    }
  }, [refreshMutationData]);

  return (
    <React.Fragment>
      {allowRender && !refreshMutationData.loading ? (
        !refreshMutationData.error ? (
          refreshMutationData.data?.refresh?.accessToken ? (
            props.children
          ) : (
            props.children
          )
        ) : (
          <div>Something went wrong!</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
}

export const CheckLogin = withRouter(CheckLoginComponent);
