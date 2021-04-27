import React, { ReactNode, FC } from 'react';
import Navbar from '../Navbar';

const PageContent = React.lazy(() => import('../PageContent'));

interface ContentWithSidebarLayoutProp {
  children?: ReactNode;
}

const ContentWithSidebarLayout: FC<ContentWithSidebarLayoutProp> = ({
  children,
}: ContentWithSidebarLayoutProp) => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <PageContent>{children}</PageContent>
    </div>
  );
};

export default ContentWithSidebarLayout;
