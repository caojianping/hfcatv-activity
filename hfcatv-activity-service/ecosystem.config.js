module.exports = {
    apps: [
        {
            name: "hfcatv-activity-service",
            script: "./dist/app.js",
            watch: true,
            watch_ignore: ["./node_modules", "./logs"],
            // 开发环境
            env_development: {
                PORT: 9000,
                NODE_ENV: "development"
            },
            // 测试环境
            env_test: {
                PORT: 9000,
                NODE_ENV: "test"
            },
            // 生产环境
            env_production: {
                PORT: 9000,
                NODE_ENV: "production"
            }
        }
    ]
};
