import React from 'react'


const ForumStatistic = ({
  foundThreads,
  foundPosts,
  foundSection,
  foundUsers,
    }) => {
  return (
    <div>
      <span>Posty:{foundPosts.length}</span>
      <span>Wątki:{foundThreads.length}</span>
      <span>Sekcje:{foundSection.length}</span>
      <span>Zarejestrowani uytkownicy:{foundUsers.length}</span>
    </div>
  );
};

export default ForumStatistic

