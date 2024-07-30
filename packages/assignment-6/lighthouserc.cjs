module.exports = {
    ci: {
        collect: {
            startServerCommand: "pnpm -F assignment-6 start",
            url: ["http://localhost:5173/"],
            numOfRuns: 1,
        },
        upload: {
            target: "filesystem",
            outputDir: "./lhci_reports",
        },
    },
};