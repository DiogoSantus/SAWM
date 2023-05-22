
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import Chart from 'chart.js/auto';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinPrice.push((coinHistory?.data?.history[i].price)*0.94300815);
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp*1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Preço em Euros',
        data: coinPrice,
        fill: false,
        backgroundColor: '#4eae00',
        borderColor: '#4eae00',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">Tabela de Preços {coinName}</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Mudança: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Preço Atual do {coinName}: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;