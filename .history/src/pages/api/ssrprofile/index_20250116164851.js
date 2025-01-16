// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log({ tokenInServerSide: token });

//     const resp = await fetch(`${process.env.API_URL}/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!resp.ok) {
//       res.status(401).json({ message: "Unauthorized" });
//     }

//     const data = await resp.json();
//     res.status(200).json({ message: "OK", data: data });
//   }
// }
