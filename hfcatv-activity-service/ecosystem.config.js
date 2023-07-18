module.exports = {
    apps: [
        {
            name: "hfcatv-activity-service",
            script: "./dist/app.js",
            watch: true,
            watch_ignore: ["./node_modules", "./logs"],
            // 开发环境
            env_development: {
                NODE_ENV: "development",
                NODE_APP_INSTANCE: "development"
            },
            // 测试环境，阿里云ECS服务器，有代理
            env_ecs: {
                NODE_ENV: "ecs",
                NODE_APP_INSTANCE: "ecs"
            },
            // 生产环境，Windows Server 2012 R2服务器，无代理
            env_production: {
                NODE_ENV: "production",
                NODE_APP_INSTANCE: "production"
            }
        }
    ]
};
