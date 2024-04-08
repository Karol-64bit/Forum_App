import React from 'react'
import ForumStatistic from '../(components)/ForumStatistic'
import Thread from "../(models)/Thread";
import Post from "../(models)/Post";
import User from "../(models)/User";
import Section from "../(models)/Section";
import ForumSettings from '../(components)/ForumSettings';
import UsersManage from '../(components)/UsersManage';
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

// import SettingsProvider from '../(components)/SettingsProvider';

const AdminDashboard = async () => {

  const session = await getServerSession(options);
  const role = session?.user?.role

  if(role!="admin"){
    redirect("/")
  }

  const foundThreads = await Thread.find();
  const foundPosts = await Post.find();
  const foundSection = await Section.find();
  const foundUsers = await User.find();

  const allUsers = JSON.parse(JSON.stringify(foundUsers))

  return (
    <div>
      <ForumStatistic
        foundThreads={foundThreads}
        foundPosts={foundPosts}
        foundSection={foundSection}
        foundUsers={foundUsers}
      />

      <ForumSettings />
      <UsersManage allUsers={allUsers}/>
    </div>
  );
}

export default AdminDashboard
