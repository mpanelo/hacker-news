import axios from "axios";

interface GetArgs {
  url: string;
}

export function get<T>(args: GetArgs) {
  return axios.get<T>(args.url);
}
