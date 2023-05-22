import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">Estatísticas globais de criptografia</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total de Criptomoedas totais" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total de trocas" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Limite total de mercado" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
        <Col span={12}><Statistic title="Volume total em 24h" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
        <Col span={12}><Statistic title="Total de Mercados" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 das Criptomoedas do Mundo</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Mostrar mais</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Últimas notícias sobre criptomoedas</Title>
        <Title level={3}><Link to="/news">Mostrar mais</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
