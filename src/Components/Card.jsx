const Card = () => {
  return (
    <section className="w-full h-fit p-2 flex flex-wrap">
  <div className="w-full h-[162px] bg-white flex flex-col justify-between rounded-b-lg rounded-t-lg border-2 border-cyan-600 hover:border-black cursor-pointer">
    <div className="h-1/2 w-full  flex justify-center rounded-t-lg items-center">
      <img
        className="w-full h-full  rounded-lg"
        src="https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/461.png"
        alt=""
      />
    </div>
    <div className="w-full h-1/2 p-3 flex  gap-3 justify-between">
      <div className="w-1/2  h-full text-wrap text-center">
        <span>Vroom Drag Meet 11th Edition INDRC R4 2024</span>
      </div>
      <div className="w-1/2  h-fit flex justify-end items-center ">
        <button className="w-3/5 h-full text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg text-lg font-bold active:text-black p-2">
          Register
        </button>
      </div>
    </div>
  </div>
</section>

  );
};

export default Card;
