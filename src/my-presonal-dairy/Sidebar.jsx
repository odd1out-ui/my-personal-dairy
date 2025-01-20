import React, { useState } from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  const [searchPage, setSearchPage] = useState(null);
  const [searchDate, setSearchDate] = useState(null);
  const navigate = useNavigate();

  const handleSearchPage = () => {
    if (searchPage) {
      navigate(`/home/page/${searchPage}`, { replace: true });
    }
  };

  const handleSearchDate = () => {
    if (searchDate) {
      navigate(`/home/date/${searchDate}`, { replace: true });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            My Diary
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Link to="/home" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Write Section</CDBSidebarMenuItem>
            </Link>

            <CDBSidebarMenuItem icon="search" onClick={handleSearchPage}>
              Search by Page
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g 1"
                  aria-label="e.g 1"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setSearchPage(e.target.value)}
                />
              </div>
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem icon="search" onClick={handleSearchDate}>
              Search by Date
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g 2025-01-20"
                  aria-label="yyyy-mm-dd"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
            </CDBSidebarMenuItem>
            <p style={{ fontWeight: 'small', marginLeft: '14px' }}>Click on search icon</p>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}></div>
        </CDBSidebarFooter>
      </CDBSidebar>

      <Outlet />
    </div>
  );
};
export default Sidebar;