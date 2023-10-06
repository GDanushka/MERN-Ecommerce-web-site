import React from "react";
import "./sidebar.css";
import { Link,useLocation } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div>
        <Link to="/admin/dashboard">
          <DashboardIcon />
        </Link>
     </div>
      <Link className={location.pathname === "/admin/products" ? "active" : ""} >
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          
            <TreeItem nodeId="1" label="Products">

            <Link to="/admin/products" > 
              <TreeItem nodeId="2" label="All" icon={ <PostAddIcon /> } />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={ <AddIcon /> } />
            </Link>

          </TreeItem>

          

        </TreeView>

      </Link>
      
      <Link to="/admin/orders" className={location.pathname === "/admin/orders" ? "active" : ""}>
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users" className={location.pathname === "/admin/users" ? "active" : ""}>
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews" className={location.pathname === "/admin/reviews" ? "active" : ""}>
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
