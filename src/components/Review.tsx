"use client"
import Rating from "@mui/material/Rating/Rating";
import { IReview } from "../api/models";

export default function Review({username, rating, description, creation_date}:IReview) {
  return (
    <div className="min-w-[300px] max-w-[300px] h-fit border-[2px] border-black rounded-[20px] py-[16px] px-[25px]">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-[15px]">{username}</span>
          <span className="text-[9px] text-[#767676]">{creation_date}</span>
        </div>
        <div>
          <Rating name="read-only" value={rating} readOnly style={{width:'90px'}} />
        </div>
      </div>

      <p className="mt-[10px] text-[12px]">{description}</p>
    </div>
  );
}
