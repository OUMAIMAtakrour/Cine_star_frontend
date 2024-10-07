import React from "react";
import HomeHeader from "../components/Navbar/homeHeader";
import { Link } from "react-router-dom";
// import "../index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
const StreamingApp = () => {
  return (
    <>
    <div className="body">
    <div
        className="glass mx-4 min-h-screen p-6 font-sans text-white mb-16"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <HomeHeader />

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <img
              src="/src/assets/img/image 2.png"
              alt="Featured Movie"
              className="w-full h-50 rounded-lg"
            />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-xl font-bold">Kubo and the Two Strings</h2>
              <button className="mt-2 px-4 py-2 bg-black bg-opacity-50 rounded-full">
                Play ▶️
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/src/assets/img/image 2.png"
              alt="Featured Movie"
              className="w-full h-50 rounded-lg"
            />
            <div className="absolute bottom-4 left-4">
              <h2 className="text-xl font-bold">Gabimaru – Hell's Paradise</h2>
              <button className="mt-2 px-4 py-2 bg-black bg-opacity-50 rounded-full">
                Play ▶️
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-20 mb-6 mx-4">
          {[
            "Horror",
            "Fantasy",
            "Action",
            "Romance",
            "Animation",
            "Sci-fi",
          ].map((category) => (
            <button
              key={category}
              className=" py-2 glass rounded-lg hover:bg-transparent transition"
            >
              {category}
            </button>
          ))}
        </div>
        <h3 className="text-2xl mb-4">Trending Movies</h3>
        <div className="grid grid-cols-6 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="relative">
                <img
                  src={`https://via.placeholder.com/150x220?text=Movie+Poster+${
                    index + 1
                  }`}
                  alt={`Movie Poster ${index + 1}`}
                  className="w-full h-49 rounded-xl"
                />
                <button className="absolute bottom-2 right-2 text-sm px-3 py-1 bg-black bg-opacity-50 rounded-xl">
                  Info
                </button>
              </div>
            ))}
        </div>
      </div>

      <h2 className="text-center text-white text-3xl mb-10 font-semibold">
        AVAILABLE SESSIONS
      </h2>
      <div>
        <div className="grid grid-cols-4 gap-8 justify-items-center mb-20">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Card className="w-96 " key={index}>
                <CardHeader shadow={false} floated={false} className="h-56">
                  <img
                    src={`https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80+${
                      index + 1
                    }`}
                    alt={`card-image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                      Gabimaru – Hell's Paradise
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      145min
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                  >
                    With plenty of talk and listen time, voice-activated Siri
                    access, and an available wireless charging case. With plenty
                    of talk and listen time, voice-activated Siri access, and an
                    available wireless charging case.
                  </Typography>
                </CardBody>

                <CardFooter className="pt-0">
                  <div className="sessions flex justify-between mb-4">
                    <span className="bg-gray-200 text-black rounded-lg px-2 ">
                      {" "}
                      14:00
                    </span>
                    <span className="bg-gray-200 text-black rounded-lg px-2 ">
                      {" "}
                      14:00
                    </span>
                    <span className="bg-gray-200 text-black rounded-lg px-2 ">
                      {" "}
                      14:00
                    </span>
                    <span className="bg-gray-200 text-black rounded-lg px-2 ">
                      {" "}
                      14:00
                    </span>
                    <span className="bg-gray-200 text-black rounded-lg px-2 ">
                      {" "}
                      14:00
                    </span>
                  </div>
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    Book now
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
      <footer className="rounded-t-2xl grid grid-cols-3 bg-gradient-to-br from-[#7990B3] to-white backdrop-blur-sm py-20">
  <div className="flex items-center pl-8">
    <img src="/src/assets/img/image 6.svg" alt="Logo" className="mr-2" />
    <p className="font-bold text-xl mr-4">CINE.STAR</p>
    
   
  </div>

  <div className="flex flex-col items-center space-y-8">
    <div className="flex justify-center gap-8 text-xl">
      <Link className="hover:text-gray-700 transition-colors">HOME</Link>
      <Link className="hover:text-gray-700 transition-colors">SESSION</Link>
      <Link className="hover:text-gray-700 transition-colors">MOVIES</Link>
    </div>
    <p className="text-sm text-gray-600">©All rights reserved</p>
  </div>
  <div className="flex space-x-4">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="lg" className="hover:text-gray-700 transition-colors" />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} size="lg" className="hover:text-gray-700 transition-colors" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="lg" className="hover:text-gray-700 transition-colors" />
      </a>
    </div>
  {/* <div className="col-span-1"></div> */}
</footer>
    </div>
     
    </>
  );
};

export default StreamingApp;
