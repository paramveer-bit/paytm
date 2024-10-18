import 'next-auth'


declare module 'next-auth' {
    interface User {
        name?: string
        email?: string,
        images?: any,
        id?: string
    }
    interface Session {
        user: {
            name?: string
            email?: string,
            images?: any,
            id?: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        name?: string | null,
        email?: string,
        sub: string,
        iat?: number,
        exp?: number,
        jti?: string
    }
}


