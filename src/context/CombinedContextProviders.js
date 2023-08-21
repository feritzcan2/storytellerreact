import ContextProviderComposer from "./ContextProviderComposer";
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

export default CombinedContextProviders;
