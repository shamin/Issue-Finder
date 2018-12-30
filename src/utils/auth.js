import { clientId, clientSecret } from "../config";
const redirectUri = chrome.identity.getRedirectURL("issue-finder");

const exchangeCodeForToken = code => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://github.com/login/oauth/access_token?" +
      "client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&redirect_uri=" +
      redirectUri +
      "&code=" +
      code
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);
      if (response.hasOwnProperty("access_token")) {
        console.log(response.access_token);
      } else {
        callback(new Error("Cannot obtain access_token from code."));
      }
    } else {
      console.log("code exchange status:", this.status);
      callback(new Error("Code exchange failed"));
    }
  };
  xhr.send();
};

export const handleProviderResponse = values => {
  console.log("providerResponse", values);
  if (values.hasOwnProperty("access_token"))
    console.log("Access Token", values.access_token);
  else if (values.hasOwnProperty("code")) exchangeCodeForToken(values.code);
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

export const setAccessToken = token => {
  access_token = token;
  console.log("Setting access_token: ", access_token);
  callback(null, access_token);
};
