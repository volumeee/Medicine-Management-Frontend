import React from "react";
import { Table, Button, Input, Tag, Pagination } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const UserTable = ({
  users,
  loading,
  onAddUser,
  onEditUser,
  onDeleteUser,
  onViewDetails,
  searchQuery,
  onSearchChange,
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role?.name === "admin" ? "red" : "blue"}>
          {role?.name || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {/* <Button
            type="default"
            icon={<ExportOutlined />}
            onClick={() => onViewDetails(record.id)}
            style={{ marginRight: 8 }}
          >
            View
          </Button> */}
          <Button type="primary" onClick={() => onEditUser(record)}>
            Edit
          </Button>
          <Button
            danger
            onClick={() => onDeleteUser(record.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddUser}>
          New User
        </Button>
        <Input
          placeholder="Search users"
          prefix={<SearchOutlined />}
          style={{ width: 200, marginLeft: 8 }}
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={false}
      />
      <div style={{ marginTop: 16 }}>
        <Pagination
          align="end"
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={onPageChange}
          showSizeChanger={false}
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </div>
  );
};

export default UserTable;
