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

function EChart({ data }) {
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data.map((item) => item.date),
    },
    yaxis: {
      title: {
        text: "Profit (Rp)",
      },
      labels: {
        formatter: function (val) {
          return formatRupiah(val).replace("Rp", "");
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return formatRupiah(val);
        },
      },
    },
  };

  const series = [
    {
      name: "Daily Profit",
      data: data.map((item) => item.daily_profit),
    },
  ];

  return (
    <>
      <div>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
    </>
  );
}

export default EChart;
