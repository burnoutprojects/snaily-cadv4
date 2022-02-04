import * as React from "react";
import { useAuth } from "context/AuthContext";
import { useListener } from "@casper124578/use-socket.io";
import { SocketEvents } from "@snailycad/config";
import { Feature } from "@snailycad/types";

export function useAreaOfPlay() {
  const { cad } = useAuth();
  const [aop, setAop] = React.useState(cad?.areaOfPlay ?? "");

  const showAop = !cad?.disabledFeatures?.includes(Feature.AOP);

  useListener(SocketEvents.UpdateAreaOfPlay, (aop: string | null) => {
    setAop(aop ?? "");
  });

  React.useEffect(() => {
    setAop(cad?.areaOfPlay ?? "");
  }, [cad?.areaOfPlay]);

  return { showAop, areaOfPlay: aop };
}
