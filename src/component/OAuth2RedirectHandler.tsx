import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import store, { RootState } from "../store";
import { getAccessToekn, setAuth } from "../store/auth/auth-Slice";
import LoadingSpinner from "../util/custom/ui/LoadingSpinner";
import { useSelector } from "react-redux";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.getLoggedInUserData);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      //prod
      params.append("redirect_uri", "http://192.200.12.176:4047/login/oauth2/code/unifcrm");
      // params.append("redirect_uri", "http://10.8.20.38:4047/login/oauth2/code/unifcrm");

      axios
        //prod
        .post("http://192.200.12.174:9001/oauth2/token", params, {
        // .post("http://10.8.20.38:9001/oauth2/token", params, {
          auth: {
            //prod
            username: "unifcrmsales",
            // username: "unifcrmm",
            password: "secret",
          },
        })
        .then((response) => {
          const token = response.data.access_token;
          // console.log("token= ", token);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          store.dispatch(getAccessToekn(token));
          store.dispatch(setAuth());
          if (!isLoading) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error.response ? error.response.data : error.message);
        });
    }
  }, [navigate]);

  return (
    <>
      <LoadingSpinner size={35} mainLoading={true} message={isLoading ? "login.." : "Hold On!"} centered={true} />
    </>
  );
};

export default OAuth2RedirectHandler;
