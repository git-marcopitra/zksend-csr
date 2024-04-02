import { Div, H1 } from "@stylin.js/elements";

import ZkSendList from "./zksend-list";

const ZkSend = () => (
  <Div
    color="#000"
    width="100vw"
    display="flex"
    alignItems="center"
    flexDirection="column"
  >
    <H1>ZkSend List</H1>
    <ZkSendList />
  </Div>
);

export default ZkSend;
