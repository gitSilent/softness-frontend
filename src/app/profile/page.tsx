import ProfilePageComponent from "@/components/page_components/ProfilePageComponent";
import { authCheck } from "@/service/authCheck";
import { NextApiRequest, NextApiResponse } from "next";

export default function ProfilePage({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  
  return (
    <ProfilePageComponent />
  );
}
