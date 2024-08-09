import { useConnect, useDisconnect, useAccount } from "wagmi";
import React, { useEffect } from 'react';

const ConnectWallet = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    console.log("Available connectors:", connectors); // Debug to see what connectors are loaded
  }, [connectors]);

  if (isConnected) {
    return (
      <div>
        <p>Connected as: {address}</p>
        <button onClick={() => disconnect()} className="btn btn-outline btn-error">
          Disconnect
        </button>
      </div>
    );
  }

  // Filter to remove duplicates based on the name property
  const uniqueConnectors = connectors.filter((connector, index, self) =>
    index === self.findIndex(t => t.name === connector.name)
  );

  return (
    <div>
      {uniqueConnectors.map((connector, index) => (
        <button key={index} onClick={() => connect({ connector })} className="btn btn-primary">
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
};

export default ConnectWallet;



