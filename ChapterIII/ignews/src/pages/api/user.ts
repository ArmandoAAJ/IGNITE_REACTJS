import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "armando" },
    { id: 2, name: "Aaj" },
    { id: 3, name: "maria" },
    { id: 4, name: "pedro" },
  ];

  return response.json(users);
};
