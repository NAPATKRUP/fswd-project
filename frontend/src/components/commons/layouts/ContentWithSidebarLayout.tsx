import { FC, lazy, ReactNode } from 'react';

const NavbarDesktop = lazy(() => import('../NavbarDesktop'));
const PageContent = lazy(() => import('../PageContent'));

interface ContentWithSidebarLayoutProp {
  children?: ReactNode;
}

const ContentWithSidebarLayout: FC<ContentWithSidebarLayoutProp> = ({
  children,
}: ContentWithSidebarLayoutProp) => {
  return (
    <div className="h-screen flex">
      <NavbarDesktop />
      <PageContent>{children}</PageContent>
    </div>
  );
};

export default ContentWithSidebarLayout;
