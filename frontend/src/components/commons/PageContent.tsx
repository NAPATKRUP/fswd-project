import { FC, lazy, ReactNode } from 'react';

interface PageContentProp {
  children?: ReactNode;
}

const NavbarMobile = lazy(() => import('./NavBarMobile'));

const PageContent: FC<PageContentProp> = ({ children }: PageContentProp) => {
  return (
    <div className="w-4/5 container mx-auto px-4 py-12 overflow-y-auto">
      <NavbarMobile />
      {children}
    </div>
  );
};

export default PageContent;
