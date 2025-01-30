import { Link } from "react-router-dom";
import flag from "../assets/amon.png";

const Head = () => {
  return (
    <section className="w-full h-full flex justify-between items-center shadow-md text-center font-thin bg-white">
      <div className="h-full w-full flex items-center phone:w-full iphone:w-full ">
        <div className="w-full h-full flex items-center  phone:justify-between iphone:justify-between lappy:justify-start  tab:justify-start  desk:justify-start   ">
          <img
            className="h-16 w-60 iphone:w-28 object-fit phone:w-36  "
            src={flag}
            alt="Flag"
          />
        </div>
      </div>
      <div className="h-full w-1/5 flex justify-center items-center phone:hidden iphone:hidden">
        <div className="w-full h-full flex justify-around items-center gap-4  ">
          <div className="   flex items-center phone:hidden iphone:hidden tab:hidden lappy:w-36 desk:w-36 2xl:w-32 tab:w-26 ">
            <div className="relative group flex justify-center items-center w-32     ">
              <button>
                <Link className="text-black" to={"/"}>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-cyan-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  phone:justify-end iphone:justify-end lappy:justify-end  tab:justify-end  desk:justify-end"
                  >
                    Dashboard
                  </button>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Head;
