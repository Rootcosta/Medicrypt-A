module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.20", // or your version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        viaIR: true, // Enable IR-based compilation
      },
    },
  },
};
