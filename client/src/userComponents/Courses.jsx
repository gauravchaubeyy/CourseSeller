import React, { useState, useEffect } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

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

  const handlePurchase = async (courseId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const headers = new Headers();
      headers.append("authorization", `Bearer ${token}`);

      const response = await fetch(
        `http://localhost:3000/api/user/users/courses/${courseId}`,
        {
          method: "POST",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to purchase course");
      }

      // Update the purchased status locally
      const updatedCourses = courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, purchased: true };
        }
        return course;
      });
      setCourses(updatedCourses);

      alert("Course purchased successfully!");
    } catch (error) {
      console.error("Error purchasing course:", error.message);
      alert("Failed to purchase course. Please try again later.");
    }
  };

  useEffect(() => {
    handleSubmit(); // Fetch courses on component mount
  }, []); 

  return (
    <>
      {!courses.length && !isLoading ? (
        <p>No courses found.</p>
      ) : isLoading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="bg-white min-h-screen">
          <div className="home-container">
            <div className="course-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-40 pl-28 gap-y-28">
              {courses.map((course) => (
                <Card 
                  key={course._id} 
                  course={course} 
                  onPurchase={() => handlePurchase(course._id)} // Pass the courseId to handlePurchase
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;


const Card = ({ course, onPurchase }) => {
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
            className={`px-4 py-2 rounded-lg text-xl ${
              course.purchased
                ? "bg-green-500 text-white"
                : "hover:bg-red-700 text-red-700 hover:text-white border border-red-700"
            }`}
            onClick={!course.purchased ? onPurchase : null} // Call onPurchase function only if course is not purchased
            disabled={course.purchased} // Disable the button if course is already purchased
          >
            {course.purchased ? "Purchased" : "Purchase"}
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



