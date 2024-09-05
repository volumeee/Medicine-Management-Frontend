import React, { lazy, Suspense } from "react";
import {
  DatePicker,
  Button,
  Card,
  Col,
  Row,
  Typography,
  Timeline,
  Table,
  Modal,
} from "antd";
import StatisticCard from "./StatisticCard";
import TableWithPagination from "./TableWithPagination";
import { formatRupiah } from "./StatisticCard";
import { StyledCard } from "./StatisticCard";

const Echart = lazy(() => import("../../chart/EChart"));
const LineChart = lazy(() => import("../../chart/LineChart"));

const { RangePicker } = DatePicker;
const { Text } = Typography;

const Home = ({
  cardData,
  rankData,
  recentData,
  charts,
  bestSellingMedicines,
  handleDateRangeChange,
  handleFilterClick,
  selectedStartDate,
  selectedEndDate,
  modalVisible,
  reverse,
  setReverse,
  pages,
  handleFetchModalData,
  totalItems,
  loading,
  handleViewAll,
  handleModalClose,
}) => {
  const columns = {
    bestSellingMedicines: [
      {
        title: "Medicine Name",
        dataIndex: "medicine_name",
        key: "medicine_name",
      },
      {
        title: "Total Quantity Sold",
        dataIndex: "total_quantity_sold",
        key: "total_quantity_sold",
      },
      {
        title: "Total Sales Amount",
        dataIndex: "total_sales_amount",
        key: "total_sales_amount",
        render: (text) => formatRupiah(text),
      },
    ],
    supplierRank: [
      {
        title: "Supplier Name",
        dataIndex: "supplier_name",
        key: "supplier_name",
      },
      { title: "Order Count", dataIndex: "order_count", key: "order_count" },
    ],
    pharmacistRank: [
      {
        title: "Pharmacist Name",
        dataIndex: "pharmacist_name",
        key: "pharmacist_name",
      },
      { title: "Total Sales", dataIndex: "total_sales", key: "total_sales" },
      {
        title: "Total Amount",
        dataIndex: "total_amount",
        key: "total_amount",
        render: (text) => formatRupiah(text),
      },
    ],
    recentSales: [
      {
        title: "Pharmacist Name",
        dataIndex: "pharmacist_name",
        key: "pharmacist_name",
      },
      {
        title: "Sale Date",
        dataIndex: "sale_date",
        key: "sale_date",
        render: (text) => new Date(text).toLocaleString(),
      },
      {
        title: "Total Amount",
        dataIndex: "total_amount",
        key: "total_amount",
        render: (text) => formatRupiah(text),
      },
    ],
  };

  return (
    <div className="layout-content">
      <div style={{ marginBottom: 16 }}>
        <RangePicker onChange={handleDateRangeChange} />
        <Button onClick={handleFilterClick} style={{ marginLeft: 8 }}>
          Filter
        </Button>
        {selectedStartDate && selectedEndDate && (
          <Text style={{ marginLeft: 16 }}>
            Filtered: {selectedStartDate} to {selectedEndDate}
          </Text>
        )}
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Sales Amount"
            value={cardData.totalSalesAmount}
            percent={cardData.salesPercentageChangeAmount}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Profit (Actual)"
            value={cardData.totalProfitActual}
            percent={cardData.profitPercentageChangeActual}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Profit (Recommended)"
            value={cardData.totalProfitRecommended}
            percent={cardData.profitPercentageChangeRecommended}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Expenses"
            value={cardData.totalExpenses}
            percent={cardData.expensesPercentageChange}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Revenue"
            value={cardData.totalRevenue}
            percent={cardData.revenuePercentageChange}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Average Sale Value"
            value={cardData.averageSaleValue}
            showPercent={false}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Medicines"
            value={cardData.totalMedicines}
            showPercent={false}
            showCurrency={false}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Stock"
            value={cardData.totalStock}
            showPercent={false}
            showCurrency={false}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Sales Count"
            value={cardData.totalSalesCount}
            showPercent={false}
            showCurrency={false}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Total Suppliers"
            value={cardData.totalSuppliers}
            showPercent={false}
            showCurrency={false}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Low Stock Count"
            value={cardData.lowStockCount}
            showPercent={false}
            showCurrency={false}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <StatisticCard
            title="Expiring Count"
            value={cardData.expiringCount}
            showPercent={false}
            showCurrency={false}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={12}>
          <StyledCard title="Profit Overview" bordered={false}>
            <Suspense fallback={<div>Loading...</div>}>
              <Echart data={charts.formattedProfitChart || []} />
            </Suspense>
          </StyledCard>
        </Col>
        <Col xs={24} lg={12}>
          <StyledCard title="Expenses Trend" bordered={false}>
            <Suspense fallback={<div>Loading...</div>}>
              <LineChart data={charts.formattedExpensesChart || []} />
            </Suspense>
          </StyledCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={12}>
          <StyledCard
            title="Supplier Ranking"
            extra={
              <Button onClick={() => handleViewAll("supplierRank")}>
                View All
              </Button>
            }
            bordered={false}
          >
            <Table
              columns={columns.supplierRank}
              dataSource={rankData.supplierRank?.data?.slice(0, 5)}
              pagination={false}
              rowKey={(record) => record.id}
            />
          </StyledCard>
        </Col>
        <Col xs={24} lg={12}>
          <StyledCard
            title="Pharmacist Ranking"
            extra={
              <Button onClick={() => handleViewAll("pharmacistRank")}>
                View All
              </Button>
            }
            bordered={false}
          >
            <Table
              columns={columns.pharmacistRank}
              dataSource={rankData.pharmacistRank?.data?.slice(0, 5) || []}
              pagination={false}
              rowKey={(record) => record.id}
            />
          </StyledCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} lg={16}>
          <StyledCard
            title="Best Selling Medicines"
            // extra={
            //   <Button onClick={() => handleViewAll("bestSellingMedicines")}>
            //     View All
            //   </Button>
            // }
            bordered={false}
          >
            <Table
              columns={columns.bestSellingMedicines}
              dataSource={bestSellingMedicines.slice(0, 5)}
              pagination={false}
              rowKey={(record) => record.id}
            />
          </StyledCard>
        </Col>
        <Col xs={24} lg={8}>
          <StyledCard
            title="Recent Sales"
            extra={
              <>
                <Button
                  onClick={() => setReverse(!reverse)}
                  style={{ marginRight: 8 }}
                >
                  {reverse ? "Oldest First" : "Newest First"}
                </Button>
                <Button onClick={() => handleViewAll("recentSales")}>
                  View All
                </Button>
              </>
            }
            bordered={false}
          >
            <Timeline
              reverse={reverse}
              items={(recentData.recentSales?.data || [])
                .slice(0, 4)
                .map((sale) => ({
                  key: sale.id,
                  color: "green",
                  children: (
                    <>
                      <Text strong>{sale.pharmacist_name}</Text>
                      <br />
                      <Text type="secondary">
                        {new Date(sale.sale_date).toLocaleString()}
                      </Text>
                      <br />
                      <Text>{formatRupiah(sale.total_amount)}</Text>
                    </>
                  ),
                }))}
            />
          </StyledCard>
        </Col>
      </Row>

      <Modal
        title="Supplier Ranking"
        open={modalVisible.supplierRank}
        onCancel={() => handleModalClose("supplierRank")}
        footer={null}
        width={800}
      >
        <TableWithPagination
          columns={columns.supplierRank}
          data={rankData.supplierRank?.data || []}
          currentPage={pages.supplier}
          total={totalItems.supplierRank}
          onPageChange={handleFetchModalData}
          dataType="supplierRank"
          loading={loading}
        />
      </Modal>

      <Modal
        title="Pharmacist Ranking"
        open={modalVisible.pharmacistRank}
        onCancel={() => handleModalClose("pharmacistRank")}
        footer={null}
        width={800}
      >
        <TableWithPagination
          columns={columns.pharmacistRank}
          data={rankData.pharmacistRank?.data || []}
          currentPage={pages.pharmacist}
          total={totalItems.pharmacistRank}
          onPageChange={handleFetchModalData}
          dataType="pharmacistRank"
          loading={loading}
        />
      </Modal>

      <Modal
        title="Recent Sales"
        open={modalVisible.recentSales}
        onCancel={() => handleModalClose("recentSales")}
        footer={null}
        width={800}
      >
        <TableWithPagination
          columns={columns.recentSales}
          data={recentData.recentSales?.data || []}
          currentPage={pages.sales}
          total={totalItems.recentSales}
          onPageChange={handleFetchModalData}
          dataType="recentSales"
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Home;
