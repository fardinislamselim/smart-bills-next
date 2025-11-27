import React from "react";
import Link from "next/link";

const  BillCard = ({ bill }) => {
  const { _id, title, category, location, date } = bill;

  return (
    <div
      className="
        card bg-base-100 
        dark:bg-base-200 
        border border-transparent hover:border-primary/30
        shadow-md hover:shadow-xl 
        rounded-2xl 
        transition-all duration-300 hover:-translate-y-1
      "
    >
      <div className="card-body space-y-2">
        <h3 className="text-xl font-bold text-primary">{title}</h3>

        <div className="space-y-1 text-sm text-base-content/80">
          <p>
            <span className="font-semibold text-base-content">Category:</span>{" "}
            {category}
          </p>
          <p>
            <span className="font-semibold text-base-content">Location:</span>{" "}
            {location}
          </p>
          <p>
            <span className="font-semibold text-base-content">Date:</span>{" "}
            {date}
          </p>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            href={`/bill/${_id}`}
            className="btn btn-primary"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BillCard;