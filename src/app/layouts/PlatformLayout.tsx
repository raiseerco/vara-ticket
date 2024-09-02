"use client";

import { useEffect, useState } from "react";

// import Alert from "@/components/ui/Alert";
import { ApisProvider } from "../../contexts/ApisContext";
import { Header } from "@/components/ui/Header";
import Loader from "../../components/Loader";
import dynamic from "next/dynamic";

const ADDRESS = {
  NODE: "wss://testnet.vara.network",
};

// const DynamicProgramMetadataProvider = dynamic<any>(
//   () => import("@gear-js/api").then((mod) => mod.ProgramMetadata),
//   {
//     ssr: false,
//   }
// );

// // const DynamicReadStateParamsProvider = dynamic(
// //   () => import("@/contexts/ApisContext").then((mod) => mod.ReadStateParams),
// //   {
// //     ssr: false,
// //   }
// // );

const DynamicAccountProvider = dynamic<any>(
  () => import("@gear-js/react-hooks").then((mod) => mod.AccountProvider),
  { ssr: false }
);

const DynamicGearAlertProvider = dynamic<any>(
  () => import("@gear-js/react-hooks").then((mod) => mod.AlertProvider),
  { ssr: false }
);

const DynamicGearApiProvider = dynamic<any>(
  () => import("@gear-js/react-hooks").then((mod) => mod.ApiProvider),
  { ssr: false }
);

const DynamicApisProvider = dynamic(
  () => import("@/contexts/ApisContext").then((mod) => mod.ApisProvider),
  {
    ssr: false,
  }
);

function PlatformLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  return (
    <main className="w-full mt-14">
      <Header isAccountVisible={true} />
      {children}
    </main>
  );
}

function App({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <DynamicGearApiProvider initialArgs={{ endpoint: ADDRESS.NODE }}>
      <DynamicAccountProvider>
        <ApisProvider>
          <DynamicApisProvider>
            {/* <DynamicGearAlertProvider template={Alert}> */}
            <PlatformLayout>{children}</PlatformLayout>
            {/* </DynamicGearAlertProvider> */}
          </DynamicApisProvider>
        </ApisProvider>
      </DynamicAccountProvider>
    </DynamicGearApiProvider>
  );
}

export default App;
