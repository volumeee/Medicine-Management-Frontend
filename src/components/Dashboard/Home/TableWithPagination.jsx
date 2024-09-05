import React from "react";
import { Table, Pagination } from "antd";
import styled from "styled-components";

const StyledPagination = styled(Pagination)`
  margin-top: 16px;
  text-align: right;
`;

const TableWithPagination = ({
  columns,
  data,
  currentPage,
  total,
  onPageChange,
  dataType,
  loading,
}) => {
  const handlePageChange = (page) => {
    onPageChange(page, dataType);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id}
        loading={loading}
      />
      <StyledPagination
        current={currentPage}
        total={total}
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
      />
    </>
  );
};

export default TableWithPagination;
