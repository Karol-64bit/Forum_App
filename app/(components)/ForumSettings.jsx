"use client"
import React, { useContext, useState } from 'react'

import {AppContext} from "@/app/(components)/AppContext";

const ForumSettings = () => {

  const settings = useContext(AppContext)

  // style={{ backgroundColor: '#6590D5' }}
  const [data, setData] = useState(settings);

  const [displayDescription, setDisplayDescription] = useState(data.displayDescription);
  const [googleProvider, setGoogleProvider] = useState(data.googleProvider);
  const [githubProvider, setGithubProvider] = useState(data.githubProvider);
  const [displayFooter, setDisplayFooter] = useState(data.displayFooter);

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedData = { ...data, googleProvider:googleProvider, githubProvider: githubProvider, [name]: value };
    setData(updatedData);
    // setData(data.googleProvider = googleProvider)
    // setData(data.githubProvider = githubProvider)
    console.log(data);
    // console.log(displayDescription);
  };

  const handleSubmit = async () => {
    const updatedData = { ...data, googleProvider:googleProvider, githubProvider: githubProvider, displayDescription:displayDescription, displayFooter:displayFooter};
    setData(updatedData);
    console.log(data);

    const res = await fetch(`/api/Settings/${data._id}`,{
      method: "PUT",
      body: JSON.stringify(data),
      "Content-type": "application/json",
    });
    console.log("response",res);
    if(!res.ok){
        throw new Error("Failed to update settings.");
    }

    
  };

  return (
    <div className="w-7/12  mx-auto">
        <div className="flex flex-wrap w-full mb-8">
          <div className="w-full mb-6 lg:mb-0">
            <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">
              Ustawienia forum
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
    <table className="min-w-full leading-normal">

        <tbody>


            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Nazwa Forum"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  <input type="text" name='title' value={data.title} onChange={handleChange} />
                </p>
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Opis Forum"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  <input type="text" name='description' value={data.description} onChange={handleChange} />
                </p>
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Wyświetl opis forum"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" name="displayDescription" className="sr-only peer" checked={displayDescription} onChange={()=>(setDisplayDescription(!displayDescription))}/>
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Tekst w stopce (na dole strony)"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  <input type="textarea" name='description' value={data.description} onChange={handleChange} />
                </p>
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Wyświetl stopke (na dole strony)"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" name="displayDescription" className="sr-only peer" checked={displayFooter} onChange={()=>(setDisplayFooter(!displayFooter))}/>
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Kolor paska nawigacji"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <input type="color" name="navColor" value={data.navColor} onChange={handleChange} />                 
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Kolor tła"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <input type="color" name="backgroundColor" value={data.backgroundColor} onChange={handleChange} />                 
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Kolor tła komponentów"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <input type="color" name="element1Color" value={data.element1Color} onChange={handleChange} />                 
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Kolor elementów ozdobnych"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <input type="color" name="element2Color" value={data.element2Color} onChange={handleChange} />                 
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  {"Regulamin forum"}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  <input type="textarea" name='statute' value={data.statute} onChange={handleChange} />
                </p>
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  Zazwól na logowanie za pomocą konta GOOGLE
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" name="displayDescription" className="sr-only peer" checked={googleProvider} onChange={()=>(setGoogleProvider(!googleProvider))}/>
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </td>
            </tr>

            <tr>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                  Zazwól na logowanie za pomocą konta GITHUB
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" name="displayDescription" className="sr-only peer" checked={githubProvider} onChange={()=>(setGithubProvider(!githubProvider))}/>
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </td>
            </tr>


        </tbody>
      </table>

      <button type="button" className='w-full' onClick={handleSubmit}>Zatwiedz wszystkie zmiany</button>

    </div>
  )
}

export default ForumSettings
