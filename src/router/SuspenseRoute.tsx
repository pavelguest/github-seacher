import { FC, PropsWithChildren, Suspense } from "react";
import { Spinner } from "../components/Spinner";

const SuspenseRoute: FC<PropsWithChildren> = ({ children }) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default SuspenseRoute;
