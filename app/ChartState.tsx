import {
  Button,
  Typography,
} from 'antd';
import { STRING_RESOURCES } from "./string-resources";
import { ChartStateType } from './page';

const { Text } = Typography;

export const ChartState: React.FC<{chartState : ChartStateType}> = (props) => {
  if (props.chartState == null) { // Tests for undefined as well, just in case
    return null;
  }

  // We could add custom "Loading..." string endings to inform user about 
  // different states of the chart loading process
  if (props.chartState.indexOf(STRING_RESOURCES.LOADING) === 0) {
    return(
      <Button type="primary" loading>
        {STRING_RESOURCES.LOADING}
      </Button>
    );
  }



  if (props.chartState.indexOf(STRING_RESOURCES.ERROR) === 0) {
    return (<Text type="danger">{props.chartState}</Text>);
  }
  
  // For some custom messages to the user
  return (<div>{props.chartState}</div>);
}