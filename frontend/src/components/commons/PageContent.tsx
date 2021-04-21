import React, { FunctionComponent } from "react";

const PageContent: FunctionComponent = (props: any) => {
    const children: React.ReactNode = props?.children;
    return (
        <div className="w-4/5 overflow-y-scroll p-4">
            {children}
        </div>
    );
}

export default PageContent;
