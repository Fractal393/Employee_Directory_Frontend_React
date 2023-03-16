import React from "react";

type Props = {};

const Test = (props: Props) => {
  return (
    <>
      <div className="flex p-10 ">
        <button className="btn text-white btn-rounded bg-blue">
          Add New User
        </button>
        <button className="btn text-white btn-rounded bg-blue">
          Existing User
        </button>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-5 p-10">
          <div className="">
            <label className="text-black/75 label">First</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              className="bg-white text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
            />
          </div>
          <div className="">
            <label className="text-black/75 label">Phone Number</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              className="bg-white text-black input font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none w-full"
            />
          </div>
          <div className="">
            <label className="text-black/75 label">Email ID</label>
            <input
              type="email"
              placeholder="username@example.com"
              name="email"
              className="bg-white text-black input w-full font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none"
            />
          </div>
          <div className="">
            <label className="text-black/75 label">DOB</label>
            <input
              type="text"
              placeholder="Software Engineer"
              name="jobTitle"
              className="bg-white text-black input w-full font-light rounded-none input-bordered border-[#8D8D8D] focus:outline-none"
            />
          </div>
          <div className="">
            <label className="text-black/75 label">Gender</label>
            <select
              placeholder="India / Seattle"
              name="office"
              className="bg-white text-black select w-full font-light rounded-none select-bordered focus:outline-none border-[#8D8D8D] text-base"
            >
              <option value="Seattle">Seattle</option>
              <option value="India">India</option>
            </select>
          </div>
        </div>

        <hr></hr>

        <div className="flex flex-col p-10">
          <div className="">
            <label className="text-black/75 label">Phone Number</label>
            <select
              placeholder="India / Seattle"
              name="office"
              className="bg-white text-black select w-full font-light rounded-none select-bordered focus:outline-none border-[#8D8D8D] text-base"
            >
              <option value="Seattle">99918298212</option>
              <option value="India">9932948348</option>
            </select>
          </div>
          John Doe akshat.dalmia@gmail.com 9887128129
          <button className="btn btn-rounded bg-blue text-white w-48">
            {" "}
            View Health Data
          </button>
        </div>
      </div>
    </>
  );
};

export default Test;
