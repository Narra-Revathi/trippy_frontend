import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to fetch all blogs
  const getAllBlogs = async () => {
    try {
      const backendURL = "https://trippy-backend-5kp0.onrender.com";

      const { data } = await axios.get(`${backendURL}/api/v1/blog/all-blog`);
      if (data?.success) {
        setBlogs(data?.blogs);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    getAllBlogs();
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="blogs-container">
      {!isLoggedIn && (
        <>
          <div className="big-image">
            {/* Add your big image here */}
          </div>
          <div className="about-us">
            <div className="about-us-content">
              <Typography variant="h4" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1">
                At TRIPPY, we're dedicated to providing you with a platform to explore, share, and create captivating travel stories. Browse through a diverse collection of travel blogs written by passionate explorers from around the globe. With our easy-to-use blog creation tool, you can craft engaging narratives, upload stunning photos, and inspire fellow travelers with your stories.
              </Typography>
            </div>
          </div>
          <div className="blogs-list">
            <Typography variant="h4" gutterBottom>
              All Blogs
            </Typography>
            {loading ? (
              <div className="loader">
                <CircularProgress />
              </div>
            ) : (
              <Grid container spacing={3}>
                {blogs.map((blog, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={blog.image}
                        alt={blog.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {blog.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {blog.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </>
      )}

      {isLoggedIn && (
        <div className="blogs-list">
          <Typography variant="h4" gutterBottom>
            All Blogs
          </Typography>
          {loading ? (
            <div className="loader">
              <CircularProgress />
            </div>
          ) : (
            <Grid container spacing={3}>
              {blogs.map((blog, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={blog.image}
                      alt={blog.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {blog.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      )}
    </div>
  );
};
export default Blogs;