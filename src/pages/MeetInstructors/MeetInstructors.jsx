import React from "react";

const instructors = [
  {
    name: "Sadia Ahmed",
    subject: "Frontend Development",
    image: "https://i.ibb.co/s2wCP0Z/instructor1.jpg",
    bio: "5+ years teaching experience in React and modern web technologies.",
  },
  {
    name: "Tanvir Hossain",
    subject: "Digital Marketing",
    image: "https://i.ibb.co/k20BzpK/instructor2.jpg",
    bio: "Expert in SEO, branding, and online business strategies.",
  },
];

const MeetInstructors = () => {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-10">
          Meet Our Instructors
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {instructors.map((ins, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={ins.image}
                  alt={ins.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-indigo-700">
                    {ins.name}
                  </h3>
                  <p className="text-sm text-gray-500">{ins.subject}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{ins.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetInstructors;
