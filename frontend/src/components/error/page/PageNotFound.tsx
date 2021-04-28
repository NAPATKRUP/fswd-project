import React, { FC } from 'react';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';

const PageNotFound: FC = () => {
  return (
    <ContentWithSidebarLayout>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '80vh',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>ERROR 404</h1>
        <h1>PAGE NOT FOUND</h1>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default PageNotFound;
