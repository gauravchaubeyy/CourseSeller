import React, { useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const headers = new Headers();
      headers.append("authorization", `Bearer ${token}`);

      const response = await fetch(
        "http://localhost:3000/api/user/users/courses",
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get courses");
      }

      const responseData = await response.json();
      const fetchedCourses = responseData.courses;

      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!courses.length && !isLoading ? ( // Only show button if courses are empty and not loading
        <button
          onClick={handleSubmit}
          className="bg-black text-white p-60 font-bold rounded-lg hover:bg-slate-300 hover:text-black"
        >
          Explore
        </button>
      ) : isLoading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="bg-white min-h-screen">
          <div className="home-container">
            {/* <h1 className="text-white text-lg font-semibold">
              Featured Courses
            </h1> */}
            <div className="course-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-40 pl-28 gap-y-28">
              {courses.map((course) => (
                <Card key={course._id} course={course} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;

const Card = ({ course }) => {
  return (
    <div className="relative overflow-hidden max-w-sm rounded shadow-2xl">
      {/* Image */}
      <img
        src={course.imageLink}
        alt={course.title}
        className="object-cover w-full h-56"
      />

      {/* Text Content */}
      <div className="p-5 bg-black text-white">
        <div>
          <h3 className="text-xl font-bold">{course.title}</h3>
          <p className="text-sm">{course.description}</p>
        </div>

        <div className="flex justify-between mt-4">
          <div>
            <p className="text-base text-gray-400">Price: ${course.price}</p>
            <p className="text-base text-gray-400">
              Published: {course.published ? "Yes" : "No"}
            </p>
          </div>
          <button
           className="hover:bg-red-700 text-red-700 hover:text-white px-4 py-2 rounded-lg shadow-md text-xl border border-red-700"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

{
  /* <div>
  <h2>Courses:</h2>
  <ul>
    {courses.map((course) => (
      <li key={course._id}>
        <pre>{JSON.stringify(course, null, 2)}</pre>
      </li>
    ))}
  </ul>
</div> */
}
