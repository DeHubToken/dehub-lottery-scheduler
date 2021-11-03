export default {
  StandardLottery: {
    Address: {
      mainnet: '0xF5A881B2c1Bc20DBE8E54674d65e8D66487da35e',
      testnet: '0xee50eF31128678ffc2D70898190Bd705d6969660',
    },
    Reward: {
      mainnet: [0, 1000, 2500, 10000],
      testnet: [1000, 2500, 5000, 10000],
    },
    TicketPrice: 100000000,
    Interval: 21600, // 6 hours, uint in seconds
  },
  SpecialLottery: {
    Address: {
      mainnet: '0xdA9F2a546AfF5deDCF464205B229d18ab35B2d22',
      testnet: '0xBFC08d0428fe5FAcD503F1eA19433e8cB0A679D7',
    },
    TicketPrice: 500000000,
    Interval: 172800, // 2 days, unit in seconds
  },
  Chainlink: {
    VRF: {
      // Documentation: https://docs.chain.link/docs/vrf-contracts/
      KeyHash: {
        mainnet:
          '0xc251acd21ec4fb7f31bb8868288bfdbaeb4fbfec2df3735ddbd4f7dc8d60103c',
        testnet:
          '0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186',
      },
    },
    DeHubRand: {
      mainnet: '0xd441586CeE8839C306aF40cae990D9f580bf1B64',
      testnet: '0xA2355ED3bfDec475ff7b79C170A58E1B00fb5F2a',
    },
    LINK: {
      mainnet: '0x404460c6a5ede2d891e8297795264fde62adbb75',
      testnet: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
    },
  },
  Report: {
    BNB: 1, // if BNB balance is below than 1, will report via email
    LINK: 1, // if LINK balance is below than 1, will report via email
  },
  SendGrid: {
    from: 'tech@dehub.net',
    to: 'tech@dehub.net',
    subject: 'Raffle Report',
  },
};
