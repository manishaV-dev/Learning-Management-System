import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);

  // Fetch all courses
  const fetchAllCourse = async () => {
    setAllCourses(dummyCourses);
  };

  // function to calculate average rating of course
  const calcRating = (course) => {
    if (course.courseRatings.length === 0) {
      // if no rating is given
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating; // suppose if someone give 4 and other 5 then totalRating is 4 + 5 = 9
    });
    return totalRating / course.courseRatings.length; // 9/2- 4.5 (suppose only two people gave rating)
  };

  useEffect(() => {
    fetchAllCourse();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calcRating,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
