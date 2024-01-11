import React from 'react';
import {
  Button,
  Flex,
  Avatar,
} from 'antd';
import {
  DownloadOutlined,
} from '@ant-design/icons';
import { STRING_RESOURCES } from './string-resources';

const { DOWNLOAD_DATA_AS_CSV } = STRING_RESOURCES;

export interface PanelUnderChartProps {
    shortUserName: string;
    avatarColor: string;
    // e.g.
    onDownloadDataClick?: () => void;
    // ...etc
}

export const PanelUnderChart: React.FC<PanelUnderChartProps> = (props) => (
    <Flex justify='space-between'>
        <Avatar style={{backgroundColor: props.avatarColor}} alt='Pavel'>
            {props.shortUserName}
        </Avatar>
        <Button icon={<DownloadOutlined />} type="default"
            onClick={props.onDownloadDataClick}
        >
            {DOWNLOAD_DATA_AS_CSV}
        </Button>
    </Flex>
);