export default {
  StandardLottery: {
    Address: {
      mainnet: "",
      testnet: "0x2608D8846F3cE4EbaD75d935e853a15Cc30bB362",
    },
    Reward: {
      mainnet: [0, 1000, 2500, 10000],
      testnet: [0, 1000, 2500, 10000]
    }
  },
  SpecialLottery: {
    Address: {
      mainnet: "",
      testnet: "0x3341e7fCe334409f61e18875F85b6ae5a1A42dFF"
    }
  },
  Interval: 300, // uint in seconds
  Ticket: {
    Price: 50000
  },
  Chainlink: {
    VRF: {
      // Documentation: https://docs.chain.link/docs/vrf-contracts/
      KeyHash: {
        mainnet: "0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c",
        testnet: "0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186",
      },
    },
  }
}