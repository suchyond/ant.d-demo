"use client"
import React, { useEffect } from 'react';
import { Button, Layout, Card, Row, Col } from 'antd/es';
import { renderChart } from './chart';

const Home = () => {
  useEffect(() => {
    renderChart();
  }, []);

  return (
  <div className="App">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title 1">
          <div>
            <Button type="primary">Button</Button>
            <div id={'chart01'}/>
          </div>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title 2" bordered={false}>
          Card content
          <div id={'chart02'}/>
        </Card>
      </Col>
    </Row>
  </div>
)};

export default Home;