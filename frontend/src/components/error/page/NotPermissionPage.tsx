import React, { FC } from "react";
import ContentWithSidebarLayout from "../../commons/layouts/ContentWithSidebarLayout";

const NotPermissionPage: FC = () => {
  return (
    <ContentWithSidebarLayout>
      <h1>You not have permission on this page</h1>
    </ContentWithSidebarLayout>
  );
};

export default NotPermissionPage;
