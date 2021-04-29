import React, { ReactNode, FC } from 'react';

const Navbar = React.lazy(() => import('../Navbar'));
const PageContent = React.lazy(() => import('../PageContent'));

interface ContentWithSidebarLayoutProp {
  children?: ReactNode;
}

const ContentWithSidebarLayout: FC<ContentWithSidebarLayoutProp> = ({
  children,
}: ContentWithSidebarLayoutProp) => {
  return (
    <div className="h-screen flex">
      <Navbar />
      <PageContent>{children}</PageContent>
    </div>
  );
};

export default ContentWithSidebarLayout;
