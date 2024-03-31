import { Input, Label, Section, Main } from "@stylin.js/elements";
import { useQuery } from "@tanstack/react-query";
import { listCreatedLinks } from "@mysten/zksend";
import { isValidSuiAddress } from "@mysten/sui.js/utils";
import { useState } from "react";

const ZkSendList = () => {
  const [address, setAddress] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: [address],
    queryFn: () => {
      if (!isValidSuiAddress(address)) return null;

      return listCreatedLinks({
        address: address,
      });
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
        gap="1rem"
        display="flex"
        color={error ? '#900' : 'unset'}
        borderRadius="1rem"
        flexDirection="column"
      >
        {isPending
          ? "Loading..."
          : error
          ? String(error)
          : !data
          ? "Nothing to show: fill address field"
          : !data.links.length
          ? "Empty list"
          : JSON.stringify(data.links)}
      </Section>
    </Main>
  );
};

export default ZkSendList;
