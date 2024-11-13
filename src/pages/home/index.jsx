// pages/home/index.jsx
import { parse } from "cookie";
import api from "@/utils/customAxios";
import Home from "@/features/home/Home";
import AnimePageTransition from "@/shared/AnimePageTransition";

const HomePage = ({ upcomingEventsData, popularEventsData }) => {
  return (
      <Home
        upcomingEventsData={upcomingEventsData}
        popularEventsData={popularEventsData}
      />
  );
};

export default HomePage;

export async function getServerSideProps(context) {
  const { req } = context;

  // Parse cookies from the request
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.cookiesessiontoken;

  // Check if the token exists
  if (!token || token !== "hardcoded-token-for-testing") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    // Make an API call using the token
    const [upcomingEventsResponse, popularEventsResponse] = await Promise.all([
      api.post(
        "secure/readAllDocuments/UpcomingEvents",
        {},
        {
          headers: {
            Cookie: req.headers.cookie || "",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      api.post(
        "secure/readAllDocuments/PopularEvents",
        {},
        {
          headers: {
            Cookie: req.headers.cookie || "",
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    ]);

    const upcomingEventsData = upcomingEventsResponse.data;
    const popularEventsData = popularEventsResponse.data;

    return {
      props: {
        upcomingEventsData,
        popularEventsData,
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error);

    // Redirect to login page if authentication fails
    if (error.response && error.response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // Return empty data or handle the error as needed
    return {
      props: {
        upcomingEventsData: [],
        popularEventsData: [],
      },
    };
  }
}
