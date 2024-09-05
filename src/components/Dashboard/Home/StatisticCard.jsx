// components/Dashboard/StatisticCard.jsx
import React from "react";
import { Card, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 20px;
  }
`;

export const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const StatisticCard = React.memo(
  ({ title, value, percent, showPercent = true, showCurrency = true }) => (
    <StyledCard bordered={false}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <span style={{ marginRight: "8px", fontWeight: "bold" }}>{title}</span>
        {showPercent && (
          <span
            style={{
              color: percent >= 0 ? "#3f8600" : "#cf1322",
              display: "flex",
              alignItems: "center",
            }}
          >
            {percent >= 0 ? (
              <ArrowUpOutlined style={{ marginRight: "2px" }} />
            ) : (
              <ArrowDownOutlined style={{ marginRight: "2px" }} />
            )}
            {Math.abs(percent)}%
          </span>
        )}
      </div>
      <Statistic
        value={value}
        precision={0}
        valueStyle={{
          color: "#008FFB",
          fontSize: "24px",
        }}
        formatter={(value) =>
          showCurrency ? formatRupiah(value) : value.toString()
        }
      />
    </StyledCard>
  )
);

export default StatisticCard;
