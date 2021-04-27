import React, { FunctionComponent, ReactNode } from 'react';

interface PageContentProp {
  children?: ReactNode;
}

const PageContent: FunctionComponent<PageContentProp> = ({ children }: PageContentProp) => {
  return <div className="w-4/5 overflow-y-scroll p-4">{children}</div>;
};

export default PageContent;
