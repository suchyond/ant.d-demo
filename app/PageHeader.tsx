import React from 'react';
import {
  Button,
  Flex,
  Typography,
} from 'antd';
import {
  DownloadOutlined,
  CommentOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { STRING_RESOURCES } from './string-resources';

const { COVID_SITUATION_IN_UK, DOWNLOAD_ALL_DATA_AS_ZIP, DISCUSSION,
    FILTER } = STRING_RESOURCES;

const { Title } = Typography;

export interface PageHeaderProps {
    // e.g.
    onDiscussionClick?: () => void;
    onFilterChange?: (newFilterSetting: any) => void;
    // ...etc
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => (
    <Flex justify='space-between'>
        <Title level={2}>{COVID_SITUATION_IN_UK}</Title>
        <Flex gap="small" align="center">
            <Button type="primary" icon={<DownloadOutlined />}>
            {DOWNLOAD_ALL_DATA_AS_ZIP}
            </Button>
            <Button type="dashed" icon={<CommentOutlined/>} onClick={props.onDiscussionClick}>
                {DISCUSSION}
            </Button>
            <Button type="default" icon={<FilterOutlined/>}>{FILTER}</Button>
        </Flex>
    </Flex>
);
