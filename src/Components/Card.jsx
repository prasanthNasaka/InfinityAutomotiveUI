const Card = () => {
  return (
    <section className="w-full h-fit flex flex-wrap">
   <div className="w-full h-[230px]  p-2 bg-white flex flex-col justify-between rounded-b-lg rounded-t-lg border-2 border-cyan-600 hover:border-black cursor-pointer">
    <div className="h-1/2 w-full  flex justify-center rounded-t-lg items-center">
      <img
        className="w-full h-full  rounded-lg"
        src="https://chronopulse-pulse.s3.ap-south-1.amazonaws.com/MapFiles/Events/461.png"
        alt=""
      />
    </div>
    <div className="w-full h-1/2 p-3 flex  gap-3 justify-between">
      <div className="w-full  h-full text-wrap text-center">
        <span>Vroom Drag Meet 11th Edition INDRC R4 2024</span>
      </div>
      
      
    </div>
    <div className="w-full   h-1/2 flex justify-center items-center ">
        <button className="w-3/5 h-20p text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg text-lg font-bold active:text-black p-2">
          Register
        </button>
      </div>
  </div>
</section>

  );
};

export default Card;
