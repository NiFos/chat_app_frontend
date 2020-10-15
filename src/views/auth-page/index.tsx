/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import queryString from "query-string";
import { Button } from "../../components/button";
import { ButtonEnum } from "../../components/button/types";
import { Divider } from "../../components/divider";
import { Input } from "../../components/Input";
import { authQuery } from "../../graphql/queries/auth.query";
import { validateEmail, validateLength } from "../../lib/validation";
import { setAccessToken } from "../../lib/apolloClient";
import { authMutation } from "../../graphql/mutations/auth.mutation";
import { chatPagePath } from "../chat-page";

export const authPagePath = `/auth`;
interface Props extends RouteComponentProps {}

interface FormData {
  username: {
    valid: boolean;
    touched: boolean;
    value: string;
  };
  email: {
    valid: boolean;
    touched: boolean;
    value: string;
  };
  password: {
    valid: boolean;
    touched: boolean;
    value: string;
  };
}
const initFormData: FormData = {
  username: {
    touched: false,
    valid: false,
    value: "",
  },
  email: {
    touched: false,
    valid: false,
    value: "",
  },
  password: {
    touched: false,
    valid: false,
    value: "",
  },
};
function AuthPageComponent(props: Props) {
  const history = useHistory();
  const [reg, setReg] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>(initFormData);
  const googleOauth = useQuery(authQuery.GET_GOOGLE_OAUTH);
  const [login, loginData] = useMutation(authMutation.LOGIN);
  const [registration, registrationData] = useMutation(
    authMutation.REGISTRATION
  );

  React.useEffect(() => {
    const query = props.location.search;
    const params = queryString.parse(query);
    if (params && params.accessToken) {
      const accessToken = params.accessToken;
      setAccessToken(accessToken as string);
      localStorage.setItem("hasRefresh", "1");
      history.push(chatPagePath);
    }
  }, []);

  React.useEffect(() => {
    const query = props.location.search;
    const params = queryString.parse(query);
    if (params && params.accessToken) {
      const accessToken = params.accessToken;
      setToken(accessToken as string);
    }
  }, []);

  React.useEffect(() => {
    if (
      (loginData.data && loginData.data?.login?.accessToken) ||
      (registrationData.data && registrationData.data?.login?.accessToken)
    ) {
      if (reg) {
        setToken(registrationData.data.login.accessToken);
      } else {
        setToken(loginData.data.login.accessToken);
      }
      history.push("/chat");
    }
  }, [loginData, registrationData]);

  function setToken(token: string) {
    setAccessToken(token);
    localStorage.setItem("hasRefresh", "1");
  }

  async function loginHandler() {
    if (formData.email.value && formData.password.value) {
      login({
        variables: {
          data: {
            email: formData.email.value,
            password: formData.password.value,
          },
        },
      });
    }
  }
  function registrationHandler() {
    if (
      formData.email.value &&
      formData.password.value &&
      formData.username.value
    ) {
      registration({
        variables: {
          data: {
            username: formData.username.value,
            email: formData.email.value,
            password: formData.password.value,
          },
        },
      });
    }
  }

  function inputHandler(value: string, name: string) {
    let valid = false;
    if (name === "email") {
      valid = validateEmail(value);
    } else {
      valid = validateLength(value, 6);
    }

    setFormData({
      ...formData,
      [name]: {
        touched: true,
        value,
        valid,
      },
    });
  }
  function submitHandler() {
    if (reg) {
      registrationHandler();
    } else {
      loginHandler();
    }
  }
  return (
    <div className="container mx-auto flex flex-col w-3/12">
      <h3>{reg ? "Register" : "Log In"}</h3>
      <Divider />
      <label htmlFor="reg">
        <input
          type="checkbox"
          id="reg"
          checked={reg}
          onChange={(e) => setReg(e.target.checked)}
        />
        <span> I will register</span>
      </label>
      <div className="flex flex-col">
        {/* Username */}
        {reg && (
          <div className="mb-2">
            {!formData.username.valid && formData.username.touched && (
              <span className="text-red-400">
                Invalid username! (min length: 6)
              </span>
            )}
            <Input
              value={formData.username.value}
              invalid={formData.username.touched && !formData.username.valid}
              name="username"
              fullwidth
              placeholder="Username"
              onChange={inputHandler}
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-2">
          {!formData.email.valid && formData.email.touched && (
            <span className="text-red-400">Invalid email!</span>
          )}
          <Input
            value={formData.email.value}
            invalid={formData.email.touched && !formData.email.valid}
            name="email"
            fullwidth
            placeholder="Email"
            onChange={inputHandler}
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          {!formData.password.valid && formData.password.touched && (
            <span className="text-red-400">
              Invalid password! (min length: 6)
            </span>
          )}
          <Input
            value={formData.password.value}
            invalid={formData.password.touched && !formData.password.valid}
            name="password"
            type="password"
            fullwidth
            placeholder="Password"
            onChange={inputHandler}
          />
        </div>
      </div>
      {/* Submit */}
      <Button type={ButtonEnum.primary} fullWidth onClick={submitHandler}>
        Submit
      </Button>
      <Divider />
      {!googleOauth.loading && googleOauth.data && (
        <a href={googleOauth.data.oauth.url}>
          <Button type={ButtonEnum.outlined} fullWidth>
            Sign-in with Google
          </Button>
        </a>
      )}
    </div>
  );
}

export const AuthPage = withRouter(AuthPageComponent);
