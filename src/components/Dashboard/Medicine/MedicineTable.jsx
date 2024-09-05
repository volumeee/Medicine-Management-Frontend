import React from "react";
import { Table, Button, Input, Tag, Pagination } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const StyledTable = styled(Table)`
  .ant-table-body {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .expired-row {
    background-color: #f8c0bf;
  }
  .out-of-stock-row {
    background-color: #ffd6a5;
  }
`;

const MedicineTable = ({
  medicines,
  loading,
  onAddMedicine,
  onEditMedicine,
  onDeleteMedicine,
  searchQuery,
  onSearchChange,
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const isExpired = (date) => {
    return new Date(date) < new Date();
  };

  const isOutOfStock = (stock) => {
    return stock <= 10;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 80,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 60,
    },
    {
      title: "Stock",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
      width: 30,
    },
    {
      title: "Expired Date",
      dataIndex: "expiry_date",
      key: "expiry_date",
      width: 50,
      sorter: (a, b) => new Date(a.expiry_date) - new Date(b.expiry_date),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Tag",
      key: "tags",
      width: 80,
      render: (_, record) => {
        const stockTag =
          record.stock_quantity > 10 ? (
            <Tag color="green">In Stock</Tag>
          ) : (
            <Tag color="red">Out Stock</Tag>
          );

        const isExpired = new Date(record.expiry_date) < new Date();
        const expiryTag = isExpired ? (
          <Tag color="red">Expired</Tag>
        ) : (
          <Tag color="blue">Active</Tag>
        );

        return (
          <>
            {stockTag}
            {expiryTag}
          </>
        );
      },
      filters: [
        { text: "In Stock", value: "inStock" },
        { text: "Out Stock", value: "outStock" },
        { text: "Active", value: "active" },
        { text: "Expired", value: "expired" },
      ],
      onFilter: (value, record) => {
        if (value === "inStock") return record.stock_quantity > 10;
        if (value === "outStock") return record.stock_quantity <= 10;
        if (value === "active")
          return new Date(record.expiry_date) >= new Date();
        if (value === "expired")
          return new Date(record.expiry_date) < new Date();
        return true;
      },
      filterMultiple: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 50,
      sorter: (a, b) => a.price - b.price,
      render: (price) => formatRupiah(price),
    },
    {
      title: "Recommended Price",
      dataIndex: "recommended_price",
      key: "recommended_price",
      width: 70,
      sorter: (a, b) => a.recommended_price - b.recommended_price,
      render: (price) => formatRupiah(price),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => onEditMedicine(record)}>
            Edit
          </Button>
          <Button
            danger
            onClick={() => onDeleteMedicine(record.id)}
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
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddMedicine}>
          New Medicine
        </Button>
        <Input
          placeholder="Search medicines"
          prefix={<SearchOutlined />}
          style={{ width: 200, marginLeft: 8 }}
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <StyledTable
        columns={columns}
        dataSource={medicines}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => <p>{record.description}</p>,
        }}
        loading={loading}
        pagination={false}
        scroll={{ x: 1300, y: 1300 }}
        rowClassName={(record) => {
          if (isExpired(record.expiry_date)) return "expired-row";
          if (isOutOfStock(record.stock_quantity)) return "out-of-stock-row";
          return "";
        }}
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

export default MedicineTable;
