import React from "react";
import { Bell, Search, ChevronLeft, ChevronRight } from "lucide-react";
import("../assets/css/test.css");

const StreamPage = () => {
  return (
    <div
      className="bg-teal-800 text-white p-4 rounded-lg h-full body"
      style={{
        backgroundImage:
          'url("https://th.bing.com/th/id/R.dc4b64f873f3824593dcaf1261145232?rik=iNyUfPvjR86m4Q&riu=http%3a%2f%2fhdqwalls.com%2fwallpapers%2fvikings-ragnar-4k-92.jpg&ehk=%2bk8I7kVYz43CeVOsxLpHLJQWUtr5vSq9ukClANJv4hU%3d&risl=&pid=ImgRaw&r=0")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img
            src="/api/placeholder/40/40"
            alt="Vikings Squads Logo"
            className="mr-2"
          />
          <span className="font-bold">Vikings Squads</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-teal-300">
            Home
          </a>
          <a href="#" className="hover:text-teal-300">
            Art
          </a>
          <a href="#" className="hover:text-teal-300">
            Movies
          </a>
          <a href="#" className="hover:text-teal-300">
            Books
          </a>
          <a href="#" className="hover:text-teal-300">
            Vikings
          </a>
          <a href="#" className="hover:text-teal-300">
            Contact us
          </a>
        </nav>
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <Bell className="w-5 h-5" />
          <img
            src="/api/placeholder/32/32"
            alt="User Avatar"
            className="rounded-full"
          />
        </div>
      </header>

      <main>
        <div className="container mx-auto">
          <div className="flex items-baseline gap-6 justify-between">
            <div>
              <h1 className="text-8xl pt-20 font-bold mb-4">Vikings History</h1>
              <p className="mb-4 par">
                On this page you will find popular products related to the
                Vikings series.
              </p>
              <ul className="list-decimal list-inside mb-4">
                <li>Interesting books</li>
                <li>Various arts, artists</li>
                <li>The whole series in excellent quality</li>
              </ul>
              <div className="flex space-x-4 mb-8 mt-8">
                <button className="bg-teal-400 text-white px-8 py-2 rounded-full">
                  SEE MORE
                </button>
                <button className="bg-transparent border-teal-400 text-teal-400 px-8 py-2 rounded-full border-2">
                  PLAY VIDEO
                </button>
              </div>
            </div>

            <div>
              <div className=" p-4 rounded-lg mb-8  custom-blur w-1/2">
                <h2 className="text-2xl font-bold mb-2">Art of Tower</h2>
                <p className="mb-2">
                  The series is not strictly historical and is based on the
                  Scandinavian sagas about the attacks of the Vikings...
                </p>
                <div className="flex justify-between items-center">
                  <span>January 6, 2020</span>
                  <a href="#" className="text-teal-300">
                    See more &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 ml-5">RELATED MOVIES :</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["VIKINGS SQUAD", "VIKINGS RESIVERS", "VIKINGS MEMORYS"].map(
              (title, index) => (
                <div
                  key={index}
                  className="bg-teal-700 p-4 rounded-lg custom-blur flex items-center"
                >
                  <img
                    width={80}
                    src="https://th.bing.com/th/id/OIP.pZb4YNWHkdX3yQQFbvxOjQHaLH?rs=1&pid=ImgDetMain"
                    alt=""
                    className="mr-4 rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2 ha">{title}</h3>
                    {/* <div className="flex items-center mt-50">
                      <span className="mr-2">Assessment:</span>
                      <div className="bg-gray-200 w-24 h-2 rounded">
                        <div
                          className="bg-teal-400 h-2 rounded"
                          style={{ width: `${[50, 90, 70][index]}%` }}
                        ></div>
                      </div>
                      <span className="ml-2">{[5, 9, 7][index]}/10</span>
                    </div> */}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StreamPage;
