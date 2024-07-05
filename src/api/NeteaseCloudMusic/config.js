/**TODO
import { parse } from "yaml";

const fileName = "NeteaseCloudMusic";

async function getConfig(path = "assets/config.yml") {
  const response = await fetch(path);
  if (response.status === 404 || response.redirected) {
    throw new Error("Config not found");
  }
  if (!response.ok) {
    throw new Error(`${response.statusText}: ${response.body}`);
  }
  const body = await response.text();
  const config = parse(body, { merge: true });
  if (!config.api) {
    throw new Error("API configuration is missing");
  }
  return config.api;
}

export async function getHeaders() {
  const config = await getConfig();
  return config.filter((item) => item.name === fileName)[0].headers || {};
}

export async function getBaseUrl() {
  const config = await getConfig();
  return config.filter((item) => item.name === fileName)[0].url || "";
}
 */

export async function getHeaders() {
  return {
    method: "GET",
    "x-rapidapi-key": "823c4fa9d6msh8fcbfbe287db1adp1959c4jsn0ed30e4ff84b",
    "x-rapidapi-host": "netease-cloud-music-api1.p.rapidapi.com",
  };
}

export async function getBaseUrl() {
  return "https://netease-cloud-music-api1.p.rapidapi.com";
}
