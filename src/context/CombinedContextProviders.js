import { GlobalProvider } from "./GlobalProvider";
import React from "react";

const CombinedContextProviders = ({ children }) => {
  return (
    <ContextProviderComposer
      contextProviders={[<GlobalProvider key={"global_state_provider"} />]}
    >
      {children}
    </ContextProviderComposer>
  );
};

const ContextProviderComposer = ({ contextProviders, children }) => {
  return contextProviders.reduceRight(
    (children, parent) => React.cloneElement(parent, { children }),
    children
  );
};
export default CombinedContextProviders;
