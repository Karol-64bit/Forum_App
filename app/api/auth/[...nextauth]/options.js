import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/app/(models)/User";
import bcrypt from "bcrypt"

export const options = {
  
  pages: {
    signIn: "/Login",
  },

    providers: [
      GitHubProvider({
            profile(profile) {
                console.log("Profile GitHub: ", profile)

                let userRole = "GitHub User"
                if(profile?.email == process.env.ADMIN_EMAIL){
                    userRole = 'admin'
                }

                return {
                    ...profile,
                    role: userRole,
                    avatar: profile.avatar_url,
                };
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_Secret,
        }),
        GoogleProvider({
            profile(profile) {
              console.log("Profile Google: ", profile);
      
              let userRole = "Google User";
              if(profile?.email == process.env.ADMIN_EMAIL){
                userRole = 'admin'
              }
              return {
                ...profile,
                id: profile.sub,
                role: userRole,
                avatar: profile.picture,
              };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_Secret,
          }),
          CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
              try {
                const foundUser = await User.findOne({ email: credentials.email })
                  .lean()
                  .exec();
      
                if (foundUser) {
                  console.log("User Exists");
                  const match = await bcrypt.compare(
                    credentials.password,
                    foundUser.password
                  );
      
                  if (match) {
                    console.log("Good Pass", foundUser);
                    delete foundUser.password;
                    foundUser["id"] = foundUser._id;
                    foundUser["role"] = foundUser.role;
                    foundUser["avatar"] = foundUser.avatarUrl;
                    foundUser["createdAt"] = foundUser.createdAt;
                    return foundUser;
                  }
                }
              } catch (error) {
                console.log(error);
              }
              return null;
            },
          })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user) {
              token.role = user.role
              token.id = user.id
              token.avatar = user.avatar
              token.createdAt = user.createdAt
            }
            return token
        },
        async session({session, token}) {
            if(session?.user) 
            {
              session.user.role = token.role
              session.user.id = token.id
              session.user.avatar = token.avatar
              session.user.createdAt = token.createdAt
            }
            // const checkMail = await User.findOne({email: session.user.email})
            // if(checkMail){
            //   console.log("Mail")
            // }else{
            //   console.log("nie mail")
            // }
            return session
        }
    }
}