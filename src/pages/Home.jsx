import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData, fetchModalData } from "../redux/actions/homeActions";
import { Spin } from "antd";

// Lazy load components
const ServerError = React.lazy(() => import("../config/ServerError"));
const HomeComponent = React.lazy(() =>
  import("../components/Dashboard/Home/HomeMap")
);

const Home = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    start: null,
    end: null,
  });
  const [modalVisible, setModalVisible] = useState({
    supplierRank: false,
    pharmacistRank: false,
    recentSales: false,
  });
  const [reverse, setReverse] = useState(false);
  const [pages, setPages] = useState({
    pharmacist: 1,
    supplier: 1,
    sales: 1,
  });

  const {
    cardData,
    rankData,
    recentData,
    charts,
    bestSellingMedicines,
    loading,
    error,
  } = useSelector((state) => state.home);

  const fetchData = useCallback(() => {
    dispatch(fetchHomeData(selectedDates.start, selectedDates.end));
  }, [dispatch, selectedDates]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDateRangeChange = useCallback((dates) => {
    setDateRange(dates);
  }, []);

  const handleFilterClick = useCallback(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      setSelectedDates({
        start: dateRange[0].format("YYYY-MM-DD"),
        end: dateRange[1].format("YYYY-MM-DD"),
      });
      setPages({
        pharmacist: 1,
        supplier: 1,
        sales: 1,
      });
    }
  }, [dateRange]);

  useEffect(() => {
    if (selectedDates.start && selectedDates.end) {
      fetchData();
    }
  }, [selectedDates, fetchData]);

  const handleViewAll = useCallback((dataKey) => {
    setModalVisible((prev) => ({ ...prev, [dataKey]: true }));
    handleFetchModalData(1, dataKey);
  }, []);

  const handleFetchModalData = useCallback(
    (page, dataType) => {
      dispatch(
        fetchModalData(dataType, page, selectedDates.start, selectedDates.end)
      ).then((data) => {
        if (data) {
          setPages((prevPages) => ({
            ...prevPages,
            [dataType === "supplierRank"
              ? "supplier"
              : dataType === "pharmacistRank"
              ? "pharmacist"
              : "sales"]: page,
          }));
        }
      });
    },
    [dispatch, selectedDates]
  );

  const handleModalClose = useCallback((dataKey) => {
    setModalVisible((prev) => ({ ...prev, [dataKey]: false }));
  }, []);

  const totalItems = useMemo(
    () => ({
      supplierRank: rankData?.supplierRank?.meta?.total || 0,
      pharmacistRank: rankData?.pharmacistRank?.meta?.total || 0,
      recentSales: recentData?.recentSales?.meta?.total || 0,
    }),
    [rankData, recentData]
  );

  if (loading && !cardData.totalSalesAmount) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <ServerError onRetry={fetchData} />;
  }

  return (
    <HomeComponent
      cardData={cardData}
      rankData={rankData}
      recentData={recentData}
      charts={charts}
      bestSellingMedicines={bestSellingMedicines}
      handleDateRangeChange={handleDateRangeChange}
      handleFilterClick={handleFilterClick}
      selectedStartDate={selectedDates.start}
      selectedEndDate={selectedDates.end}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      reverse={reverse}
      setReverse={setReverse}
      pages={pages}
      totalItems={totalItems}
      handleFetchModalData={handleFetchModalData}
      handleViewAll={handleViewAll}
      handleModalClose={handleModalClose}
      loading={loading}
    />
  );
};

export default Home;
