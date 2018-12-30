import { clientId } from "../config";
const redirectUri = chrome.identity.getRedirectURL("issue-finder");
const redirectRe = new RegExp(redirectUri + "[#?](.*)");

import { handleProviderResponse, parseRedirectFragment} from "../utils/auth"

const options = {
  interactive: true,
  url:
    "https://github.com/login/oauth/authorize" +
    "?client_id=" +
    clientId +
    "&redirect_uri=" +
    encodeURIComponent(redirectUri)
};

chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
  console.log(
    "launchWebAuthFlow completed",
    chrome.runtime.lastError,
    redirectUri
  );
  if (chrome.runtime.lastError) {
    callback(new Error(chrome.runtime.lastError));
    return;
  }
  const matches = redirectUri.match(redirectRe);
  if (matches && matches.length > 1)
    handleProviderResponse(parseRedirectFragment(matches[1]));
  else callback(new Error("Invalid redirect URI"));
});
