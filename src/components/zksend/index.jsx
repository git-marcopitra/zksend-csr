import { Div, H1 } from "@stylin.js/elements";

import ZkSendList from "./zksend-list";

const ZkSend = () => (
  <Div display="flex" flexDirection="column" alignItems="center" width="100vw">
    <H1>ZkSend List</H1>
    <ZkSendList />
  </Div>
);

export default ZkSend;
