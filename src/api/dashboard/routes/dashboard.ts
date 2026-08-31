export default{
    routes: [
        {
            method: 'GET',
            path: '/dashboard',
            handler: 'dashboard.getDashboard',
            config: {
                auth: false,
            },
        },
    ]
}