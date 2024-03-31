import { Div, Input, Label } from "@stylin.js/elements";
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

  return (
    <Div>
      <Label>Address</Label>
      <Input
        type="text"
        placeholder="address"
        onChange={(e) => setAddress(e.target.value)}
      />
      {isPending
        ? "Loading..."
        : error
        ? JSON.stringify(error)
        : data
        ? "Nothing to show"
        : !data.links.length
        ? "Empty list"
        : JSON.stringify(data.links)}
    </Div>
  );
};

export default ZkSendList;
