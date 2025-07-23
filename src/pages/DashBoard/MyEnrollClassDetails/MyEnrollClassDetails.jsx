import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaRegPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [submissionData, setSubmissionData] = useState({});

  const {
    data: assignments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/class/${id}`);
      return res.data;
    },
  });

  //  Fetch class info to get class title
  const { data: classInfo } = useQuery({
    queryKey: ["classInfo", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  const handleAssignmentSubmit = async (assignmentId) => {
    const submissionText = submissionData[assignmentId];

    if (!submissionText || submissionText.trim() === "") {
      return Swal.fire({
        icon: "warning",
        title: "Submission Required",
        text: "Please enter a submission link before submitting.",
      });
    }

    try {
      // Save submission to DB
      await axiosSecure.post("/assignment-submissions", {
        assignmentId,
        classId: id,
        userEmail: user.email,
        submission: submissionText,
        submittedAt: new Date(),
      });

      // Increment submission count in assignment
      await axiosSecure.patch(`/assignments/increment/${assignmentId}`);

      // Optional: clear the input field
      setSubmissionData((prev) => ({
        ...prev,
        [assignmentId]: "",
      }));

      refetch();

      //  Show success message
      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Your assignment has been submitted successfully.",
        confirmButtonColor: "#3b82f6",
      });
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Submit",
        text: "Something went wrong while submitting your assignment.",
      });
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axiosSecure.post("/feedback", {
        classId: id,
        classTitle: classInfo?.title || "Unknown Class", //  send class title
        studentEmail: user.email,
        studentImage: user.photoURL, //  send user image
        description,
        rating,
        submittedAt: new Date(),
      });

      // Reset form
      setDescription("");
      setRating(0);
      document.getElementById("feedback_modal").close();

      Swal.fire({
        icon: "success",
        title: "Feedback Submitted!",
        text: "Your teaching evaluation has been saved successfully.",
        confirmButtonColor: "#3b82f6",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while submitting your feedback.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl text-center font-bold text-primary mb-6">
        Assignments
      </h2>
      <table className="table w-full mb-10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Submission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assign) => (
            <tr key={assign._id}>
              <td>{assign.title}</td>
              <td>{assign.description}</td>
              <td>{assign.deadline}</td>
              <td>
                <input
                  type="text"
                  className="input input-sm input-bordered w-full"
                  value={submissionData[assign._id] || ""}
                  onChange={(e) =>
                    setSubmissionData({
                      ...submissionData,
                      [assign._id]: e.target.value,
                    })
                  }
                  placeholder="Paste submission link"
                />
              </td>
              <td>
                <button
                  onClick={() => handleAssignmentSubmit(assign._id)}
                  className="btn btn-sm btn-primary text-white"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Teaching Evaluation Button */}
      <div className="text-center mt-10">
        <button
          className="btn btn-outline btn-secondary"
          onClick={() => document.getElementById("feedback_modal").showModal()}
        >
          Teaching Evaluation Report
        </button>
      </div>

      {/* DaisyUI Modal */}
      <dialog
        id="feedback_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-3">Submit Feedback</h3>
          <textarea
            className="textarea textarea-bordered w-full mb-4"
            rows={4}
            placeholder="Write your feedback..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <Rating
            value={rating}
            onChange={setRating}
            style={{ maxWidth: 150 }}
            className="mb-4"
          />
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-ghost">Cancel</button>
              <button
                type="button"
                onClick={handleFeedbackSubmit}
                className="btn btn-primary text-white"
              >
                <FaRegPaperPlane className="mr-1" /> Send
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyEnrollClassDetails;
