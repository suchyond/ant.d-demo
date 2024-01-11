import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Header } from 'antd/es/layout/layout';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Header style={{ color: "white" }}>
        <h1>Demo for MSD</h1>
      </Header>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;