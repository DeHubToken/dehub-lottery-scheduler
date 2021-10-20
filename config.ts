export default {
  StandardLottery: {
    Address: {
      mainnet: "",
      testnet: "0xA452e1F38780850916E226Af23d8F1ca61CDD4fD",
    },
    Reward: {
      mainnet: [0, 1000, 2500, 10000],
      testnet: [0, 1000, 2500, 10000]
    }
  },
  SpecialLottery: {
    Address: {
      mainnet: "",
      testnet: "0x27304E4620fB6024ffd5d32a7f48F8c934a99d35"
    }
  },
  Interval: 21600, // uint in seconds
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
    to: "dehub.lottery.report@dehub.net",
    subject: "Lottery Report",
  }
}