import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, EuroCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CrytoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('24h');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const criptoDetalhes = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Preço em Euros', value: `${((criptoDetalhes?.price)*0.94300815) && millify((criptoDetalhes?.price)*0.94300815)} €`, icon: <EuroCircleOutlined /> },
    { title: 'Classificação', value: criptoDetalhes?.rank, icon: <NumberOutlined /> },
    { title: 'Valor de Mercado', value: `${((criptoDetalhes?.marketCap)*0.94300815) && millify((criptoDetalhes?.marketCap)*0.94300815)}`, icon: <EuroCircleOutlined /> },
    { title: 'All-time-high (média diária)', value: `${((criptoDetalhes?.allTimeHigh?.price)*0.94300815) && millify((criptoDetalhes?.allTimeHigh?.price)*0.94300815)} €`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Número de Mercados', value: criptoDetalhes?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Número de Exchanges', value: criptoDetalhes?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Fornecimento Aprovado', value: criptoDetalhes?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total de Fornecimentos', value: `${((criptoDetalhes?.supply?.total)*0.94300815) && millify((criptoDetalhes?.supply?.total)*0.94300815)} €`, icon: <ExclamationCircleOutlined /> },
    { title: 'Fornecimento Circulante', value: `${((criptoDetalhes?.supply?.circulating)*0.94300815) && millify((criptoDetalhes?.supply?.circulating)*0.94300815)} €`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          Preço de {data?.data?.coin.name} ({data?.data?.coin.symbol})
        </Title>
        <p>Preço ao vivo de {criptoDetalhes.name} em euros. Veja as estatísticas, capitalização de mercado e oferta.</p>
      </Col>
      <Select defaultValue="24h" className="select-timeperiod" placeholder="Selecione o Período de Tempo" onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(criptoDetalhes?.price)} coinName={criptoDetalhes?.name} />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{criptoDetalhes.name} Estatísticas</Title>
            <p>Uma visão geral que mostra as estatísticas de {criptoDetalhes.name}, como a moeda base e cotada, a classificação e o volume de negociação.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Outras Informações de Estatísticas</Title>
            <p>Uma visão geral que mostra as estatísticas de {criptoDetalhes.name}, como a moeda base e cotada, a classificação e o volume de negociação.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc ant-card ant-card-bordered ant-card-hoverable description">
          <Title level={3} className="coin-details-heading espacamento">What is {criptoDetalhes.name}?</Title>
          <span className='espacamento'>{HTMLReactParser(criptoDetalhes.description)}</span>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">Links Relacionados com {criptoDetalhes.name}</Title>
          {criptoDetalhes.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CrytoDetails;