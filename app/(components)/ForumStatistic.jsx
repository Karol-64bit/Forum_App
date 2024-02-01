import React from 'react'


const ForumStatistic = ({
  foundThreads,
  foundPosts,
  foundSection,
  foundUsers,
    }) => {
  return (
    <div className="w-7/12  mx-auto">

        <div className="container-sm px-5 py-5">
          <div className="flex flex-wrap w-full mb-8">
            <div className="w-full mb-6 lg:mb-0">
              <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">Statystyka forum</h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{foundPosts.length}</h2>
                  <p className="leading-relaxed text-gray-100 font-bold">Posty</p>
              </div>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{foundThreads.length}</h2>
                  <p className="leading-relaxed text-gray-100 font-bold">Wątki</p>
              </div>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{foundSection.length}</h2>
                  <p className="leading-relaxed text-gray-100 font-bold">Sekcje</p>
              </div>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <div className="bg-indigo-500 rounded-lg p-2 xl:p-6">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{foundUsers.length}</h2>
                  <p className="leading-relaxed text-gray-100 font-bold">Użytkownicy</p>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default ForumStatistic

