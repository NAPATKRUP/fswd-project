import { FC, ReactNode } from 'react';

interface PageContentProp {
  children?: ReactNode;
}

const PageContent: FC<PageContentProp> = ({ children }: PageContentProp) => {
  return <div className="w-4/5 container mx-auto px-4 py-12 overflow-y-scroll">{children}</div>;
};

export default PageContent;
