import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../shop/LoginContext";
import Dashboard from "../pages/Dashboard";
import Company from "../pages/company/Company";
import AddCompany from "../pages/company/AddCompany";
import CompanyDetails from "../pages/company/CompanyDetails";
import Departments from "../pages/departments/Departments";
import AddDepartments from "../pages/departments/AddDepartment";
import DepartmentDetails from "../pages/departments/DepartmentDetails";
import Employees from "../pages/employees/Employees";
import AddEmployee from "../pages/employees/AddEmployee";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Groups from "../pages/groups/Groups";
import GroupDetails from "../pages/groups/GroupDetails";
import NotFound from "../pages/NotFound";
import AddGroup from "../pages/groups/AddGroup";
import EmployeeDetails from "../pages/employees/EmployeeDetails";
import Users from "../pages/users/Users";
import AddUser from "../pages/users/AddUser";
import UserDetails from "../pages/users/UserDetails";
import Notifications from "../pages/notifications/Notifications";
import ProfileSetting from "../pages/profile_setting/ProfileSetting";
import ChangePassword from "../pages/profile_setting/ChangePassword";
import MainAppSettings from "../pages/app_settings/MainAppSettings";
import Login from "../pages/login/Login";

const AppRoutes = () => {
  let storageId = sessionStorage.getItem("userId");

  const loginContext = useContext(LoginContext);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" exact element={loginContext.isLogin ? <Dashboard /> : <Navigate to="/login" />} /> */}
        {console.log(storageId)}
        <Route
          path="/"
          exact
          element={(storageId && loginContext.isLogin) ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={(storageId && loginContext.isLogin) ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Company Routes */}
        <Route
          path="/company"
          exact
          element={(storageId && loginContext.isLogin) ? <Company /> : <Navigate to="/login" />}
        />
        <Route
          path="/company/:id"
          exact
          element={storageId ? <CompanyDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/company/edit/:id"
          exact
          element={storageId ? <AddCompany /> : <Navigate to="/login" />}
        />
        <Route
          path="/company/add-company"
          exact
          element={storageId ? <AddCompany /> : <Navigate to="/login" />}
        />
        {/* Departments Routes */}
        <Route
          path="/departments"
          element={storageId ? <Departments /> : <Navigate to="/login" />}
        />
        <Route
          path="/departments/:id"
          element={storageId ? <DepartmentDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/departments/edit/:id"
          element={storageId ? <AddDepartments /> : <Navigate to="/login" />}
        />
        <Route
          path="/departments/add-department"
          element={storageId ? <AddDepartments /> : <Navigate to="/login" />}
        />

        <Route
          path="/groups"
          element={storageId ? <Groups /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/:id"
          element={storageId ? <GroupDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/edit/:id"
          element={storageId ? <AddGroup /> : <Navigate to="/login" />}
        />
        <Route
          path="/groups/add-group"
          element={storageId ? <AddGroup /> : <Navigate to="/login" />}
        />

        <Route
          path="/employees"
          exact
          element={storageId ? <Employees /> : <Navigate to="/login" />}
        />
        <Route
          path="/employees/add-employee"
          element={storageId ? <AddEmployee /> : <Navigate to="/login" />}
        />
        <Route
          path="/employees/:id"
          element={storageId ? <EmployeeDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/employees/edit/:id"
          element={storageId ? <AddEmployee /> : <Navigate to="/login" />}
        />

        <Route
          path="/users"
          exact
          element={storageId ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/add-user"
          element={storageId ? <AddUser /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/:id"
          element={storageId ? <UserDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/edit/:id"
          element={storageId ? <AddUser /> : <Navigate to="/login" />}
        />

        <Route
          path="/notifications"
          element={storageId ? <Notifications /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile-setting"
          element={storageId ? <ProfileSetting /> : <Navigate to="/login" />}
        />
        {/* // for change password pass id as params until handle login data */}
        <Route
          path="/profile-setting/change-password"
          element={storageId ? <ChangePassword /> : <Navigate to="/login" />}
        />

        <Route
          path="/app-setting"
          element={storageId ? <MainAppSettings /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={(storageId && loginContext.isLogin) ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
