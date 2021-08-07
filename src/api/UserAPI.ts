import { Subject } from "rxjs";
import createAxiosInstance from "../config/axios-config";
const axiosInstance = createAxiosInstance();
type SignInResponse = { token: string };

export const userAuthSubject = new Subject();
export function signIn(username: string, password: string) {
  return axiosInstance.post<SignInResponse>("/user/signin", {
    username,
    password,
  });
}
