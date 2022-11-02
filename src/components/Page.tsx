import React, { ReactNode } from 'react';

function Page({ children }: { children: ReactNode }) {
  return <div className="page">{children}</div>;
}

export default Page;
