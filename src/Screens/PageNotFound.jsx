import { HomeIcon } from "@heroicons/react/16/solid";

import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="h-screen w-full bg-white overflow-hidden">
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="relative w-full h-fit mb-8">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
              alt="Workspace"
              className="w-full h-full object-fill rounded-lg "
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-600">
              404 Not Found
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Whoops! That page doesn&apos;t exist.
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              The page you&apos;re looking for has vanished into the digital
              void. Let&apos;s help you find your way back.
            </p>
          </div>

          <div className="">
            <p className="text-gray-700 mb-4 font-medium">
              Here are some helpful links instead:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <HomeIcon className="w-5 h-5 mr-2" />
                <Link to={"/"}>Take Me There !</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
