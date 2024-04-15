import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/lib/prisma';

const authOptions: NextAuthOptions = {
    secret:process.env.AUTH_SECRET,
    providers:[
        CredentialsProvider({
            name:"sign in",
            credentials:{
                username:{
                    label:"username",
                    type:"username",
                    placeholder:""
                },
                password:{
                    label:"password",
                    type:"password"
                },
            },
            async authorize(credentials) {
                if(!credentials?.username || !credentials.password){
                    return null;
                }
                const user = await prisma.user.findUnique({
                   where:{username:credentials.username.toLocaleLowerCase()}
                });
                
                // || !(await compare(credentials.password,user.password)
                if(!user || !(user!.password === credentials.password)){
                    return null;
                }
                const usersessiondata =  {
                    id:user!.id,
                    username:user!.username,
                }
                return usersessiondata
            },
        })
    ],
   
    session:{
        maxAge: 2*24*60*60
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.user = user;
            }
            return token;
        },
        async session({session,token}) {
            session.user = token.user!;
            return session;
        },
    }
}
export default authOptions;