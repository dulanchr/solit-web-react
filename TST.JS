// ... import statements

export default function CourseContainer() {
  // ... useState and useEffect hooks

  useEffect(() => {
    axios.get("http://localhost:3001/coursecard").then((response) => {
      setCourseData(response.data);
      // Retrieve images for each course after getting the course data
      response.data.forEach((course) => {
        retrieveImage(course.imageid); // Assuming there is a property "imageid" in the course data
      });
    });
  }, []);

  // ... retrieveImage function and getCategroyColor function

  return (
    <div className="tp-courses__tab-content">
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-all"
          role="tabpanel"
          aria-labelledby="pills-all-tab"
        >
          <div className="row">
            {CourseData.map((course, index) => {
              // Check if image URLs are available for the current course
              const imageUrl =
                imageurl[course.imageid] && imageurl[course.imageid][0]
                  ? imageurl[course.imageid][0]
                  : classimage;

              return (
                <div
                  className="col-lg-4 col-md-6 tp-courses__item mb-30"
                  key={index}
                  onClick={() => {
                    navigate(`/coursecontent/${course.courseId}`);
                  }}
                >
                  <div
                    className="tp-courses__thumb w-img fix p-relative"
                    style={{ backgroundImage: `url(${imageUrl})` }} // Fix the style attribute
                  >
                    <img src={courseimg} width={400} alt="coursethumb" />
                    <span
                      className="tp-courses__cat"
                      style={{
                        backgroundColor: getCategroyColor(course.category),
                      }}
                    >
                      {course.category}
                    </span>
                  </div>
                  {/* ... rest of the code */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
