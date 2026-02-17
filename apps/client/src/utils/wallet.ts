import { Address } from "@ton/core";

export const WalletUtils = {
  parseRawAddress(address: string): string {
    return Address.parseRaw(address).toString({
      urlSafe: false,
      bounceable: true,
      testOnly: true, // For testnet
    });
  },
};

// export default (address: string): string => {
//   return Address.parseRaw(address).toString({
//     urlSafe: false,
//     bounceable: true,
//     testOnly: true, // For testnet
//   });
// };
