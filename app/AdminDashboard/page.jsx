import React from 'react'
import ForumStatistic from '../(components)/ForumStatistic'
import Thread from "../(models)/Thread";
import Post from "../(models)/Post";
import User from "../(models)/User";
import Section from "../(models)/Section";
import ForumSettings from '../(components)/ForumSettings';

const AdminDashboard = async () => {

  const foundThreads = await Thread.find();
  const foundPosts = await Post.find();
  const foundSection = await Section.find();
  const foundUsers = await User.find();

  return (
    <div>
      <ForumStatistic
        foundThreads={foundThreads}
        foundPosts={foundPosts}
        foundSection={foundSection}
        foundUsers={foundUsers}
      />

      <ForumSettings />
    </div>
  );
}

export default AdminDashboard
