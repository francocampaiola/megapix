/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kjkjliehslimcolvmcix.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/dni/*',
            }
        ]
    }
}

module.exports = nextConfig
