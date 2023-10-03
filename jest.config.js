module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    verbose: true,
    collectCoverage: true,
    setupFiles: [
        "jest-canvas-mock"
    ]
}