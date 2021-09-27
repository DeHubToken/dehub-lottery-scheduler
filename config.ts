export default {
  StandardLottery: {
    Address: {
      mainnet: "",
      testnet: "0xB5FA0844CEFff47D3A0D8023eFF54b3fBBabC706",
    },
    Reward: {
      mainnet: [0, 1000, 2500, 10000],
      testnet: [0, 1000, 2500, 10000]
    }
  },
  SpecialLottery: {
    Address: {
      mainnet: "",
      testnet: "0x596F2b7E7Fb04114ac44E61b67a5BC5600c9e146"
    }
  },
  Interval: 21600, // uint in seconds
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
  },
  SendGrid: {
    from: "dehub.lottery@dehub.net",
    to: "dehub.lottery.report@dehub.net",
    subject: "Lottery Report",
  }
}