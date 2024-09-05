import React from "react";
import ReactApexChart from "react-apexcharts";

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

function LineChart({ data }) {
  const chartOptions = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: data.map((item) => item.date),
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
      y: {
        formatter: function (val) {
          return formatRupiah(val);
        },
      },
    },
    yaxis: {
      title: {
        text: "Expenses (Rp)",
      },
      labels: {
        formatter: function (val) {
          return formatRupiah(val).replace("Rp", "");
        },
      },
    },
  };

  const series = [
    {
      name: "Daily Expenses",
      data: data.map((item) => item.daily_expenses),
    },
  ];

  return (
    <>
      <div>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="area"
          height={350}
          width="100%"
        />
      </div>
    </>
  );
}

export default LineChart;
