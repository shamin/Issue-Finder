import { clientId, clientSecret } from "../config";
const redirectUri = chrome.identity.getRedirectURL("issue-finder");

const exchangeCodeForToken = (code, callback) => {
  fetch(
    "https://github.com/login/oauth/access_token?" +
      "client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&redirect_uri=" +
      redirectUri +
      "&code=" +
      code,
    {
      method: "get",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("access_token")) {
        callback(null, data["access_token"]);
      } else {
        callback(new Error("Cannot obtain access_token from code."));
      }
    })
    .catch(error => {
      console.log(error)
      callback(new Error("Code exchange failed"));
    });
};

export const handleProviderResponse = (values, callback) => {
  if (values.hasOwnProperty("access_token")) callback(null, access_token);
  else if (values.hasOwnProperty("code"))
    exchangeCodeForToken(values.code, callback);
  else callback(new Error("Neither access_token nor code avialable."));
};

export const parseRedirectFragment = fragment => {
  const pairs = fragment.split(/&/);
  const values = {};

  pairs.forEach(function(pair) {
    const nameval = pair.split(/=/);
    values[nameval[0]] = nameval[1];
  });

  return values;
};
