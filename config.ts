export default {
  StandardLottery: {
    Address: {
      mainnet: "",
      testnet: "0x6E25e0505070d0904F5A50763765baA3a0Bf4f27",
    },
    Reward: {
      mainnet: [0, 1000, 2500, 10000],
      testnet: [1000,2500,5000,10000]
    },
    Interval: 1800, // 21600, // 6 hours, uint in seconds
  },
  SpecialLottery: {
    Address: {
      mainnet: "",
      testnet: "0x7891040f4E662d31251200A56Fb9569D81ac52ae"
    },
    Interval: 1800, // 172800 // 2 days, unit in seconds
  },
  Ticket: {
    Price: 100000000
  },
  Chainlink: {
    VRF: {
      // Documentation: https://docs.chain.link/docs/vrf-contracts/
      KeyHash: {
        mainnet: "0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c",
        testnet: "0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186",
      },
    },
  },
  SendGrid: {
    from: "tech@dehub.net",
    to: "tech@dehub.net",
    subject: "Raffle Report",
  }
}