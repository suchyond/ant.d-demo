"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Row,
  Col,
  Flex,
  Typography,
} from 'antd';
import { MyChart } from './chart';
import { CovidDatasource, Datasource } from './datasource';
import { CovidData } from './model/CovidData';
import { STRING_RESOURCES } from './string-resources';
import { ChartState } from './ChartState';

const { Title } = Typography;

const { LOADING, ERROR, NEW_COVID_CASES, CUMULATIVE_COVID_ADMISSIONS,
  COVID_SITUATION_IN_UK
} = STRING_RESOURCES;

enum ChartDivId {
  LEFT = "leftChart",
  RIGHT = "rightChart",
}

/**
 * - If null, chart with data is shown.
 * - If string, that starts with STRING_RESOURCES.LOADING,
 * then loading indicator is shown.
 * - If string, that starts with STRING_RESOURCES.ERROR,
 * then it contains error message.
 */
export type ChartStateType = string | null;

const Home = () => {
  const [chartLeftState, setChartLeftState] = useState<ChartStateType>(LOADING);
  const [chartRightState, setChartRightState] = useState<ChartStateType>(LOADING);

  const datasourceRef = useRef<Datasource<CovidData>>();
  const leftChartRef = useRef<MyChart>();
  const rightChartRef = useRef<MyChart>();

  useEffect(() => {
    if (!datasourceRef.current) {
      datasourceRef.current = new CovidDatasource();

      datasourceRef.current
        .getData()
        .then((data) => {
          data.data.reverse(); // Reverse is done in place
          return data;
        })
        .then((data) => {
          leftChartRef.current = new MyChart({
            container: ChartDivId.LEFT,
            covidData: data,
            yAxisMetrics: 'newCases',
          });
          leftChartRef.current.renderChart();
          setChartLeftState(null);

          rightChartRef.current = new MyChart({
            container: ChartDivId.RIGHT,
            covidData: data,
            yAxisMetrics: 'cumAdmissions',
          });
          rightChartRef.current.renderChart();
          setChartRightState(null);
        }).catch((error) => {
          setChartLeftState(ERROR + error.message);
          setChartRightState(ERROR + error.message);
        });
      
      return () => {
        // TODO: Add cleanup if needed
        leftChartRef.current?.destroy();
        rightChartRef.current?.destroy();
      };
    }
    
  }, []);

  return (
  <div className="App">
    <Flex justify='space-between'>
      <Title level={2}>{COVID_SITUATION_IN_UK}</Title>
      <Flex gap="small" align="center">
        <Button type="primary">Button</Button>
        <Button type="dashed">Button 2</Button>
        <Button type="default">Button 3</Button>
      </Flex>
    </Flex>
    

    <Row gutter={16}>
      <Col span={8}>
        <Card title={NEW_COVID_CASES}>
          <ChartState chartState={chartLeftState} />           
          <div id={ChartDivId.LEFT}/>
        </Card>
      </Col>
      <Col span={8}>
        <Card title={CUMULATIVE_COVID_ADMISSIONS}>
          <ChartState chartState={chartRightState} />  
          <div id={ChartDivId.RIGHT}/>
        </Card>
      </Col>
    </Row>
  </div>
);
};

export default Home;