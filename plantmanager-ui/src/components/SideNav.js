import React, { useState } from "react";
import {
  CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavGroup,
  CNavItem,
  CNavTitle,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {
  cilCloudDownload,
  cilLayers,
  cilPuzzle,
  cilSpeedometer,
} from "@coreui/icons";

const SideNav = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <script
        src="https://kit.fontawesome.com/c2100eb4b6.js"
        crossorigin="anonymous"
      ></script>

      <nav
        id="sidebar"
        style={{
          bottom: "0px",
          position: "fixed",
          width: "250px",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 999,
          background: "#7386D5",
          color: "#fff",
          transition: "all 0.3s",
        }}
      >
        <div className="custom-menu">
          <button
            type="button"
            id="sidebarCollapse"
            className="btn btn-primary"
          >
            <i className="fa fa-bars" style={{ color: "darkolivegreen" }}></i>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
        <h1>
          <a
            href="#"
            className="logo"
            style={{ backgroundColor: "darkolivegreen" }}
          >
            Plant Manager
          </a>
        </h1>
        <ul className="list-unstyled components mb-5">
          <li>
            <a href="#">
              <span class="fa fa-pagelines mr-3"></span> | My Greenhouse
            </a>
          </li>
          <li>
            <a href="#">
              <span class="fa-solid fa-clipboard-list mr-3"></span> | My
              Schedule
            </a>
          </li>
          <li>
            <a href="#">
              <span class="fa fa-users mr-3"></span> | Friends
            </a>
          </li>
          <li>
            <a href="#">
              <span class="fa fa-exclamation-circle mr-3"></span> | Support
            </a>
          </li>
          <li>
            <a href="#">
              <span class="fa fa-cog mr-3"></span> | Settings
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa-solid fa-person-walking-arrow-right"></i> | Register
            </a>
          </li>
          <li>
            <a href="#">
              <span class="fa-solid fa-right-to-bracket"></span> | Login
            </a>
          </li>
        </ul>
      </nav>
    </>
  );

  // return (
  //   <CSidebar
  //     className="border-end"
  //     unfoldable
  //     onVisibleChange={() => setShow(!show)}
  //   >
  //     <CSidebarHeader className="border-bottom">
  //       <CSidebarBrand>{"PlantManager"}</CSidebarBrand>
  //     </CSidebarHeader>
  //     <CSidebarNav>
  //       <CNavItem href="#">
  //         <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Nav item
  //       </CNavItem>
  //       <CNavItem href="#">
  //         <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> With badge{" "}
  //         <CBadge color="primary ms-auto">NEW</CBadge>
  //       </CNavItem>
  //       <CNavGroup
  //         toggler={
  //           <>
  //             <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
  //           </>
  //         }
  //       >
  //         <CNavItem href="#">
  //           <span className="nav-icon">
  //             <span className="nav-icon-bullet"></span>
  //           </span>{" "}
  //           Nav dropdown item
  //         </CNavItem>
  //         <CNavItem href="#">
  //           <span className="nav-icon">
  //             <span className="nav-icon-bullet"></span>
  //           </span>{" "}
  //           Nav dropdown item
  //         </CNavItem>
  //       </CNavGroup>
  //       <CNavItem href="https://coreui.io">
  //         <CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download
  //         CoreUI
  //       </CNavItem>
  //       <CNavItem href="https://coreui.io/pro/">
  //         <CIcon customClassName="nav-icon" icon={cilLayers} /> Try CoreUI PRO
  //       </CNavItem>
  //     </CSidebarNav>
  //     <CSidebarHeader className="border-top">
  //       <CSidebarToggler />
  //     </CSidebarHeader>
  //   </CSidebar>
  // );
};

export default SideNav;
