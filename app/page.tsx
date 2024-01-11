"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button, Layout, Card, Row, Col } from 'antd/es';
import { MyChart } from './chart';
import { CovidDatasource, Datasource } from './datasource';
import { CovidData } from './model/CovidData';



const Home = () => {
  const [chart1state, setChart1state] = useState<string | null>("Loading...");
  // const [chart2state, setChart2state] = useState<string | null>("Loading...");

  const datasourceRef = useRef<Datasource<CovidData>>();
  const leftChartRef = useRef<MyChart>();

  useEffect(() => {
    // TODO: Add cleanup
    datasourceRef.current = new CovidDatasource();

    datasourceRef.current
      .getData()
      .then((data) => {
        leftChartRef.current = new MyChart({
          container: 'leftChart',
          covidData: data,
          yAxisMetrics: 'newCases',
        });
        leftChartRef.current.renderChart();
        setChart1state(null);
      });
    return () => {
      leftChartRef.current?.destroy();
    };
  }, []);

  return (
  <div className="App">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title 1">
            {chart1state ?? (<div>{chart1state}</div>)}
            <Button type="primary">Button</Button>
            <div id={'leftChart'}/>
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
);
};

export default Home;