import { Input, Label, Section, Main } from "@stylin.js/elements";
import { useQuery } from "@tanstack/react-query";
import { isValidSuiAddress } from "@mysten/sui.js/utils";
import { useState } from "react";

import { listCreatedLinks } from "../../utils/zksend";
import { Div } from "@stylin.js/elements";
import { P } from "@stylin.js/elements";

const ZkSendList = () => {
  const [address, setAddress] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: [address],
    queryFn: () => {
      if (!isValidSuiAddress(address)) return null;

      return listCreatedLinks(
        {
          address: address,
        },
        window.fetch.bind(window) // HERE IS THE IMPLEMENTATION
      );
    },
  });

  console.log({ isPending, error, data });

  return (
    <Main display="flex" flexDirection="column" gap="1rem">
      <Section
        p="2rem"
        bg="white"
        gap="1rem"
        display="flex"
        borderRadius="1rem"
        flexDirection="column"
      >
        <Label>Address</Label>
        <Input
          p="0.5rem"
          type="text"
          outline="none"
          minWidth="30rem"
          placeholder="address"
          borderRadius="0.2rem"
          border="1px solid #666"
          onChange={(e) => setAddress(e.target.value)}
        />
      </Section>
      <Section
        p="2rem"
        bg="white"
        display="flex"
        borderRadius="1rem"
        flexDirection="column"
        color={error ? "#900" : "unset"}
      >
        {isPending
          ? "Loading..."
          : error
          ? String(error)
          : !data
          ? "Nothing to show: fill address field"
          : !data.links.length
          ? "Empty list"
          : data.links.map((link, index) => (
              <Div
                key={index}
                display="flex"
                justifyContent="space-between"
                borderTop={index && "1px solid"}
              >
                <Div>
                  <P>Balances: {link.assets.balances.length}</P>
                  <P>NFTs: {link.assets.nfts.length}</P>
                </Div>
                <P>{new Date(link.createdAt).toLocaleString()}</P>
              </Div>
            ))}
      </Section>
    </Main>
  );
};

export default ZkSendList;
