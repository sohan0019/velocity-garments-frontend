import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ViewTracking = () => {
  const { trackingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />

  const sortedTrackings = [...trackings].reverse();

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold p-8 pb-2 text-gray-800">
          📦 Track order
        </h2>

        <p className="px-8 text-gray-600">
          Tracking ID:{" "}
          <span className="font-semibold text-blue-600">{trackingId}</span>
        </p>

        <p className="px-8 pb-4 text-gray-500">
          Logs so far: {trackings.length}
        </p>
        <ul className="timeline timeline-vertical py-6 pb-10 px-4">
          {sortedTrackings.map((log, index) => {
            const isLast = index === 0;

            return (
              <li key={log._id}>
                <div
                  className={`timeline-start text-sm ${isLast ? "font-bold text-green-600" : "text-gray-500"}`}
                >
                  {new Date(log.createdAt).toLocaleString()}
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 ${isLast ? "text-green-600 scale-125" : "text-gray-400"}`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div
                  className={`timeline-end timeline-box shadow-md
    ${
      isLast
        ? "bg-green-50 border border-green-500"
        : "bg-white border border-gray-200"
    }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-lg
        ${isLast ? "font-bold text-green-700" : "text-gray-700"}`}
                    >
                      {log.details}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      📍 {log.location}
                    </span>
                    {isLast && (
                      <span className="w-fit mt-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                </div>

                <hr className={isLast ? "bg-green-500" : ""} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ViewTracking;
