const Card = () => {
  return (
    <section className="w-1/4 h-fit p-2 flex flex-wrap lappy:w-1/2 tab:w-1/2 phone:w-1/2 iphone:w-full phone:h-auto">
      <div className="w-full h-60 phone:h-auto bg-white shadow-lg flex flex-col justify-center items-center rounded-b-lg rounded-t-lg border-2 border-cyan-600 hover:border-black cursor-pointer ">
        <div className="h-1/2 w-full flex justify-center rounded-t-lg  items-center">
          <img
            className="w-full h-full object-fit rounded-lg"
            src="https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/461.png"
            alt=""
          />
        </div>
        <div className="w-full h-1/2 p-2 flex flex-col gap-3 ">
          <div className="w-full h-fit text-wrap text-center">
            <span>Vroom Drag Meet 11th Edittion INDRC R4 2024</span>
          </div>
          <div className="w-full h-fit flex justify-center items-center">
            <button className="w-4/5 h-full text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg text-lg font-bold active:text-black  p-2">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
