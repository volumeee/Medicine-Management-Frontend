import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message, theme } from "antd";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  addUser,
} from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/Dashboard/Users/UserForm";

// Lazy load components
const ServerError = React.lazy(() => import("../config/ServerError"));
const UserTable = React.lazy(() =>
  import("../components/Dashboard/Users/UserTable")
);

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, currentPage, totalItems, error } = useSelector(
    (state) => state.user
  );
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchUsers(page, pageSize));
  }, [dispatch, page, pageSize]);

  if (error) {
    return <ServerError onRetry={() => dispatch(fetchUsers(page, pageSize))} />;
  }

  const showModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
    if (user) {
      form.setFieldsValue({
        ...user,
        roleName: user.role?.name,
      });
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingUser) {
          const updatedValues = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== undefined && values[key] !== "") {
              acc[key] = values[key];
            }
            return acc;
          }, {});
          dispatch(updateUser(editingUser.id, updatedValues))
            .then(() => {
              setIsModalOpen(false);
              form.resetFields();
              message.success("User updated successfully");
              dispatch(fetchUsers(page, pageSize));
            })
            .catch((error) => {
              message.error(error.message || "Failed to update user");
            });
        } else {
          dispatch(addUser(values))
            .then(() => {
              setIsModalOpen(false);
              form.resetFields();
              message.success("User added successfully");
              dispatch(fetchUsers(page, pageSize));
            })
            .catch((error) => {
              message.error(error.message || "Failed to add user");
            });
        }
      })
      .catch((info) => {
        message.error("Please fill in all required fields");
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      onOk: () => {
        dispatch(deleteUser(id))
          .then(() => {
            message.success("User deleted successfully");
            return dispatch(fetchUsers(page, pageSize));
          })
          .catch((error) => {
            message.error(error.message || "Failed to delete user");
          });
      },
    });
  };

  const handleViewDetails = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredUsers = users.filter((user) => {
    if (!user || !user.id) return false;
    const username = user.username || "";
    const email = user.email || "";
    const roleName = user.role?.name || "";
    return (
      username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div
      style={{
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <UserTable
        users={filteredUsers}
        loading={loading}
        onAddUser={() => showModal()}
        onEditUser={(user) => showModal(user)}
        onDeleteUser={handleDelete}
        onViewDetails={handleViewDetails}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
      <Modal
        title={editingUser ? "Edit User" : "New User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <UserForm
          form={form}
          isEditing={!!editingUser}
          initialValues={editingUser}
        />
      </Modal>
    </div>
  );
};

export default Users;
