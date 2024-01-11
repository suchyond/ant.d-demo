"use client"
import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  Row,
  Col,
} from 'antd';
import { MyChart } from './chart';
import { CovidDatasource, Datasource } from './datasource';
import { CovidData } from './model/CovidData';
import { STRING_RESOURCES } from './string-resources';
import { ChartState } from './ChartState';
import { PageHeader } from './PageHeader';
import { PanelUnderChart } from './PanelUnderChart';

const { LOADING, ERROR, NEW_COVID_CASES, CUMULATIVE_COVID_ADMISSIONS,
  } = STRING_RESOURCES;

enum ChartDivId {
  LEFT = "leftChart",
  RIGHT = "rightChart",
  // add other chart here
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
    <PageHeader/>
    
    <Row gutter={16}>
      <Col span={12}>
        <Card title={NEW_COVID_CASES}>
          <ChartState chartState={chartLeftState} />           
          <div id={ChartDivId.LEFT}/>
          <PanelUnderChart shortUserName="Ondra" avatarColor="#f56a00"/>
        </Card>
      </Col>
      <Col span={12}>
        <Card title={CUMULATIVE_COVID_ADMISSIONS}>
          <ChartState chartState={chartRightState} />  
          <div id={ChartDivId.RIGHT}/>
          <PanelUnderChart shortUserName="Pavel" avatarColor="#7265e6"/>
        </Card>
      </Col>
    </Row>
  </div>
);
};

export default Home;