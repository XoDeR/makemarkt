import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({
  prefix,
  value,
}: Props) => {
  const cookies = await getCookies();

  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled = process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING === "true";

  if (isDevelopment || !isSubdomainRoutingEnabled) {
    cookies.set({
      name: `${prefix}-token`,
      value: value,
      httpOnly: true,
      path: "/",
    });
  } else {
    cookies.set({
      name: `${prefix}-token`,
      value: value,
      httpOnly: true,
      path: "/",
      sameSite: "none",
      domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      secure: process.env.NODE_ENV === "production",
    });
  }
}