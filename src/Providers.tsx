import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
