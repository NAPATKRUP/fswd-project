import React, { FunctionComponent } from "react";

const PageContent: FunctionComponent = (props) => {
    const children: any = props;
    return (
        <div className="w-4/5 overflow-y-scroll p-4">
            {children}
        </div>
    );
}

export default PageContent;
