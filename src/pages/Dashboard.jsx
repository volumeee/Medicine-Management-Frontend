// Dashboard.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { Layout, Breadcrumb, Spin } from "antd";
import { Link, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBreadcrumbs } from "../redux/actions/breadcrumbAction";
import { hideSessionExpiredModal } from "../redux/actions/authActions";
import SessionExpiredModal from "../components/Auth/SessionExpiredModal";
import { maintenancePages } from "../config/MaintenanceConfig";

const {
  Header: AntHeader,
  Content: AntContent,
  Footer: AntFooter,
  Sider,
} = Layout;

// Lazy load layout components
const Sidebar = React.lazy(() => import("../components/Layout/Sidebar"));
const Header = React.lazy(() => import("../components/Layout/Header"));
const Footer = React.lazy(() => import("../components/Layout/Footer"));
const Maintenance = React.lazy(() => import("../config/Maintenance"));
const NotFound = React.lazy(() => import("../config/NotFound"));

// Lazy load components
const Home = React.lazy(() => import("./Home"));
const Users = React.lazy(() => import("./Users"));
const Medicines = React.lazy(() => import("./Medicine"));
const Suppliers = React.lazy(() => import("./Supplier"));

const Dashboard = React.memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const showSessionExpiredModal = useSelector(
    (state) => state.auth.showSessionExpiredModal
  );

  const handleCloseSessionExpiredModal = () => {
    dispatch(hideSessionExpiredModal());
  };

  const updateBreadcrumbsCallback = useCallback(() => {
    const pathSnippets = location.pathname.split("/").filter(Boolean);
    dispatch(updateBreadcrumbs(pathSnippets));
  }, [location.pathname, dispatch]);

  useEffect(() => {
    updateBreadcrumbsCallback();
    localStorage.setItem("lastPath", location.pathname);
  }, [updateBreadcrumbsCallback, location.pathname]);

  const breadcrumbNameMap = useMemo(
    () => ({
      "/dashboard": "Dashboard",
      "/dashboard/home": "Home",
      "/dashboard/users": "Users",
      "/dashboard/medicines": "Medicines",
      "/dashboard/suppliers": "Suppliers",
      "/dashboard/purchases": "Purchases",
      "/dashboard/sales": "Sales",
      "/dashboard/reports": "Reports",
    }),
    []
  );

  const breadcrumbItems = useMemo(
    () =>
      location.pathname
        .split("/")
        .filter(Boolean)
        .map((_, index, array) => {
          const url = `/${array.slice(0, index + 1).join("/")}`;
          return {
            title: (
              <Link to={url}>
                {breadcrumbNameMap[url] || url.split("/").pop()}
              </Link>
            ),
          };
        }),
    [location.pathname, breadcrumbNameMap]
  );

  const renderRoute = (path, Component) => {
    if (maintenancePages[path]) {
      return (
        <Route
          key={path}
          path={path}
          element={
            <Maintenance
              pageName={path.charAt(0).toUpperCase() + path.slice(1)}
            />
          }
        />
      );
    }
    return <Route key={path} path={path} element={<Component />} />;
  };

  const layoutStyle = {
    minHeight: "100vh",
  };

  const siderStyle = {
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  };

  const layoutContentStyle = {
    marginLeft: collapsed ? 80 : 200,
    transition: "margin-left 0.2s",
  };

  const headerStyle = {
    padding: 0,
    background: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1,
  };

  const breadcrumbStyle = {
    margin: "16px 24px 0",
  };

  const contentStyle = {
    margin: "24px 16px",
    padding: 24,
    minHeight: "calc(100vh - 112px)",
    overflowY: "auto",
    zIndex: 0,
  };

  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <Layout style={layoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={siderStyle}
        trigger={null}
      >
        <Suspense fallback={<Spin style={spinnerStyle} />}>
          <Sidebar collapsed={collapsed} />
        </Suspense>
      </Sider>
      <Layout style={layoutContentStyle}>
        <AntHeader style={headerStyle}>
          <Suspense fallback={<Spin style={spinnerStyle} />}>
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          </Suspense>
        </AntHeader>
        <Breadcrumb style={breadcrumbStyle} items={breadcrumbItems} />
        <AntContent style={contentStyle}>
          <Suspense
            fallback={
              <div style={spinnerStyle}>
                <Spin size="large" />
              </div>
            }
          >
            <Routes>
              <Route
                index
                element={
                  <Navigate
                    to={localStorage.getItem("lastPath") || "home"}
                    replace
                  />
                }
              />
              {renderRoute("home", Home)}
              {renderRoute("users", Users)}
              {renderRoute("medicines", Medicines)}
              {renderRoute("suppliers", Suppliers)}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AntContent>
        <AntFooter>
          <Suspense fallback={<Spin style={spinnerStyle} />}>
            <Footer />
          </Suspense>
        </AntFooter>
        <SessionExpiredModal
          visible={showSessionExpiredModal}
          onClose={handleCloseSessionExpiredModal}
        />
      </Layout>
    </Layout>
  );
});

export default Dashboard;
