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
            // 测试环境，阿里云ECS服务器
            env_ecs: {
                PORT: 80,
                NODE_ENV: "ecs"
            },
            // 生产环境，Windows Server 2012 R2服务器
            env_production: {
                PORT: 80,
                NODE_ENV: "production"
            }
        }
    ]
};
