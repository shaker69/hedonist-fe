import { getServerSession } from "next-auth";

import auth from "@app/auth";

import LoginPage from "./LoginPage";
import { redirect } from "@app/navigation";

export default async function Login() {
  const session = await getServerSession(auth);

  if (session) redirect('/');

  return <LoginPage />;
}
