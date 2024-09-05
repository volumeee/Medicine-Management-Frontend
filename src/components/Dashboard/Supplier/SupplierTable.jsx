import React from "react";
import { Table, Button, Input, Tag, Pagination } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledTable = styled(Table)`
  .ant-table-body {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const SupplierTable = ({
  suppliers,
  loading,
  onAddSupplier,
  onEditSupplier,
  onDeleteSupplier,
  searchQuery,
  onSearchChange,
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 100,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person",
      key: "contact_person",
      width: 100,
      sorter: (a, b) => a.contact_person.localeCompare(b.contact_person),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
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
          <Button type="primary" onClick={() => onEditSupplier(record)}>
            Edit
          </Button>
          <Button
            danger
            onClick={() => onDeleteSupplier(record.id)}
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
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddSupplier}>
          New Supplier
        </Button>
        <Input
          placeholder="Search suppliers"
          prefix={<SearchOutlined />}
          style={{ width: 200, marginLeft: 8 }}
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <StyledTable
        columns={columns}
        dataSource={suppliers}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={false}
        scroll={{ x: 1500, y: 1300 }}
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

export default SupplierTable;
