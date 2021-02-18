module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      platforms: [],
      config: {
        name: "minimal_setup",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux", "win32"],
    },
    {
      name: "@electron-forge/maker-deb",
      platforms: ["linux"],
      config: {},
    },
  ],
};
