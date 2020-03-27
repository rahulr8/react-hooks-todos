import React, { useContext } from "react";

import { UserContext } from "./index";

export default function App() {
  // Obtain the required value by using the useContext hook
  const value = useContext(UserContext);
  return <div>Hello {value}</div>;
}
