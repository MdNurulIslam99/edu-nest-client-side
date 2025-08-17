import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TeacherClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  //  Fetch Class Info
  const { data: classInfo } = useQuery({
    queryKey: ["classInfo", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${id}`);
      return res.data;
    },
  });

  //  Fetch Assignments
  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/class/${id}`);
      return res.data;
    },
  });

  //  Fetch Submissions Count for each assignment
  const [submissionsMap, setSubmissionsMap] = useState({});

  useEffect(() => {
    const fetchSubmissionCounts = async () => {
      const counts = {};
      await Promise.all(
        assignments.map(async (assignment) => {
          const res = await axiosSecure.get(
            `/assignment-submissions/count/${assignment._id}`
          );
          counts[assignment._id] = res.data?.count || 0;
        })
      );
      setSubmissionsMap(counts);
    };

    if (assignments.length) {
      fetchSubmissionCounts();
    }
  }, [assignments, axiosSecure]);

  const totalSubmissions = Object.values(submissionsMap).reduce(
    (acc, curr) => acc + curr,
    0
  );

  //  Mutation to Create Assignment
  const { mutate: createAssignment } = useMutation({
    mutationFn: async (assignmentData) => {
      const res = await axiosSecure.post("/assignments", assignmentData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire("Created!", "Assignment added successfully.", "success");
        setNewAssignment({ title: "", description: "", deadline: "" });
        document.getElementById("assignment_modal").close();
        queryClient.invalidateQueries(["assignments", id]);
      }
    },
  });

  //  Submit Handler
  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const assignmentData = {
      ...newAssignment,
      classId: id,
      createdAt: new Date(),
      teacherName: user?.displayName,
      teacherEmail: user?.email,
    };
    createAssignment(assignmentData);
  };

  return (
    <div className="w-11/12 mt-16 mb-10 mx-auto p-4 space-y-10">
      <div>
        {" "}
        <h2 className="text-3xl  font-bold text-center text-primary mb-4">
          Class Progress Overview
        </h2>
        <p className="text-gray-600 max-w-4xl text-center mx-auto mt-2">
          Quickly track your class's overall performance with insights into
          enrollments, assignments, and submissions to measure student
          engagement and progress.
        </p>
      </div>

      {/* Class Progress */}
      <div className="grid md:grid-cols-3 gap-6 mt-14">
        <div className="card bg-blue-100 p-6 shadow">
          <h3 className="text-lg font-bold mb-2">Total Enrollment</h3>
          <p className="text-3xl font-semibold text-blue-700">
            {classInfo?.totalEnrollment || 0}
          </p>
        </div>
        <div className="card bg-green-100 p-6 shadow">
          <h3 className="text-lg font-bold mb-2">Total Assignments</h3>
          <p className="text-3xl font-semibold text-green-700">
            {assignments.length}
          </p>
        </div>
        <div className="card bg-purple-100 p-6 shadow">
          <h3 className="text-lg font-bold mb-2">Total Submissions</h3>
          <p className="text-3xl font-semibold text-purple-700">
            {totalSubmissions}
          </p>
        </div>
      </div>

      {/* Assignment Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Class Assignments</h3>
          <button
            className="btn btn-primary btn-sm flex items-center"
            onClick={() =>
              document.getElementById("assignment_modal").showModal()
            }
          >
            <FaPlusCircle className="mr-2" /> Create
          </button>
        </div>

        {/* Assignment List */}
        <ul className="space-y-4">
          {assignments.map((a, index) => (
            <li key={a._id} className="p-4 bg-base-100 shadow rounded">
              <h4 className="font-semibold">{a.title}</h4>
              <p className="text-sm">{a.description}</p>
              <p className="text-xs text-gray-500 mb-1">
                Deadline: {a.deadline}
              </p>
              <p className="text-sm text-blue-600 font-medium">
                Submissions: {submissionsMap[a._id] || 0}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <dialog
        id="assignment_modal"
        className="modal modal-bottom  sm:modal-middle"
      >
        <div className="modal-box max-w-lg max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Create New Assignment
          </h3>
          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div>
              <label className="label">Assignment Title</label>
              <input
                type="text"
                value={newAssignment.title}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, title: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">Assignment Deadline</label>
              <input
                type="date"
                value={newAssignment.deadline}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    deadline: e.target.value,
                  })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">Assignment Description</label>
              <textarea
                value={newAssignment.description}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    description: e.target.value,
                  })
                }
                className="textarea textarea-bordered w-full"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Add Assignment
              </button>
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TeacherClassDetails;
