import { FC, lazy, ReactNode } from 'react';

const Navbar = lazy(() => import('../Navbar'));
const PageContent = lazy(() => import('../PageContent'));

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
