import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/lib/prisma';

const authOptions: NextAuthOptions = {
    secret:process.env.AUTH_SECRET,
    providers:[
        CredentialsProvider({
            name:"sign in",
            credentials:{},
            async authorize(credentials) {
                const{username,password} = credentials as {username:string, password:string}
                if(!username || !password){
                    throw new Error("Invalid credentials");
                }
                try{
                    const user = await prisma.adminUser.findUnique({
                    where:{username}
                    });
                    console.log("user:",user);
                    if(!user || (user!.password != password)){
                        throw new Error("Invalid credentials");
                    }
                    const usersessiondata =  {
                        id:user.id,
                        username:user.username,
                    }
                    return usersessiondata
                }catch(error){
                    console.log(error);
                    throw error;
                }
            },
        })
    ],
   
    session:{
        maxAge: 24*60*60
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
    },
    pages:{
        signIn:"/"
    }
}
export default authOptions;