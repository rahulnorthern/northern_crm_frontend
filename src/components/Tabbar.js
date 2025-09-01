import React from 'react'
import { Link, useLocation } from "react-router-dom";

const Tabbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
        <div className='tab-container width-100'>
            <div className="tablinks">
              <Link
                to="/projects"
                className={`text-decoration-none ${isActive("/projects") ? "active-tab" : "tablinks"}`}
              >
                Projects
              </Link>{" "}
              |{" "}
              <Link
                to="/tasks"
                className={`text-decoration-none ${isActive("/tasks") ? "active-tab" : "tablinks"}`}
              >
                Tasks
              </Link>{" "}
              |{" "}
              <Link
                to="/updates"
                className={`text-decoration-none ${isActive("/updates") ? "active-tab" : "tablinks"}`}
              >
                Updates
              </Link>
            </div>
        </div>                
    </>
  )
}

export default Tabbar