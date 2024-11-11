// pages/api/proxy/handler.js
import axios from "axios";
import cookie from "cookie";
import { parse } from "cookie";
import {
  popularEventsCardData,
  popularEventsData,
} from "@/utils/popularEventsData";

// export default async function handler(req, res) {
//   const { path } = req.query;
//   const cookies = cookie.parse(req.headers.cookie || '');
//   const token = cookies.jwt;

//   try {
//     const response = await axios({
//       method: req.method,
//       url: `https://99b5-67-165-141-227.ngrok-free.app/${path.join('/')}`,
//       data: req.body,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': req.headers['content-type'],
//       },
//     });

//     res.status(response.status).json(response.data);
//   } catch (error) {
//     console.error('Proxy error:', error.response?.data || error.message);
//     res
//       .status(error.response?.status || 500)
//       .json(error.response?.data || { message: 'Server error' });
//   }
// }

export default async function handler(req, res) {
  const { path } = req.query; // path is an array of path segments

  // Parse cookies safely
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.cookiesessiontoken;
  // Validate the hardcoded token
  if (token !== "hardcoded-token-for-testing") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Define mock data
  const upcomingEventsDataSet = popularEventsCardData;

  const popularEventsDataSet = popularEventsData;

  const eventsData = popularEventsCardData;

  const userData = {
    id: 1,
    firstName: "Joshua",
    lastName: "Smith",
    email: "thatboiJosh@gmail.com",
    avatar: "tengen",
    userName: "ThatFla$hyBoi",
  };

  const route = path.join("/");

  // Define route handlers
  const mockResponses = {
    "secure/readAllDocuments/UpcomingEvents": (req, res) =>
      res.status(200).json(upcomingEventsDataSet),
    "secure/readAllDocuments/PopularEvents": (req, res) =>
      res.status(200).json(popularEventsDataSet),
    events: (req, res) => res.status(200).json(eventsData),
    "secure/ReadDocument": (req, res) => {
      // Find event by name from the request body
      const { name } = req.body;
      const event = eventsData.find((e) => e.name === name);
      if (event) {
        return res.status(200).json(event);
      } else {
        return res.status(404).json({ message: "Event not found" });
      }
    },
    user: (req, res) => res.status(200).json(userData),
  };

  // Check if the route exists in mockResponses
  const routeHandler = mockResponses[route];

  if (routeHandler) {
    // Call the route handler
    return routeHandler(req, res);
  } else {
    // Default response for other endpoints
    return res.status(404).json({ message: "Not Found" });
  }
}
