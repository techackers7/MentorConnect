"use client";
import React, { useState, useEffect, Suspense } from "react";

const ProfileContent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [skillString, setSkillString] = useState("");
  const [companyString, setCompanyString] = useState("");
  const [hackathonString, setHackathonString] = useState("");

  // --- Options from your Registration Page ---
  const degreeOptions = ["Select", "BTech", "MTech", "MBA", "PhD"];
  const levelOptions = [
    "Select",
    "1st-2nd Year",
    "3rd Year",
    "Final Year",
    "Fresh Graduates",
  ];
  const commitmentOptions = [
    "Select",
    "1–2 hrs/week",
    "3–5 hrs/week",
    "Flexible",
  ];

  const branches = [
    "Select",
    "Computer Science Engineering",
    "Computer Science and Engineering (Artificial Intelligence & Machine Learning)",
    "Information Technology",
    "Computer Engineering",
    "Electronics and Communication Engineering",
    "Electronics and Instrumentation Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Mechanical Engineering (AI & Robotics)",
    "Textile Engineering",
    "Biotechnology",
    "Aerospace Engineering",
    "Metallurgical and Materials Engineering",
    "Chemistry",
    "Mathematics and Computing",
    "Physics",
    "Energy System and Management",
    "Industrial Engineering and Management",
    "Mechanical System Design",
    "Power Electronics and Drives",
    "Robotics and Artificial Intelligence",
    "Structural Engineering",
    "VLSI Design and Embedded System",
    "Water Resource Engineering",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.success) {
          const user = data.user;
          setUserData(user);

          setSkillString(
            Array.isArray(user.skills)
              ? user.skills.join(", ")
              : user.skills || "",
          );
          setCompanyString(
            Array.isArray(user.companies)
              ? user.companies.join(", ")
              : user.companies || "",
          );
          setHackathonString(
            Array.isArray(user.hackathons)
              ? user.hackathons.join(", ")
              : user.hackathons || "",
          );
        } else {
          // Handle error silently or alert
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size too big (Max 2MB)");
        return;
      }
      const base64 = await convertToBase64(file);
      setUserData({ ...userData, image: base64 });
    }
  };

  const handleSave = async () => {
    const finalSkills = skillString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    const finalCompanies = companyString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    const finalHackathons = hackathonString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    const updatedData = {
      ...userData,
      skills: finalSkills,
      companies: finalCompanies,
      hackathons: finalHackathons,
    };

    const { _id, ...cleanData } = updatedData;

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Profile Updated Successfully!");
        setUserData(updatedData);
        setIsEditing(false);
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  if (!userData)
    return (
      <div className="min-h-screen flex justify-center items-center">
        User not found
      </div>
    );

  const getProfileImage = () => {
    if (userData.image) return userData.image;
    const name = userData.name || "User";
    const bgColor = userData.role === "mentor" ? "0D8ABC" : "6366f1";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=fff&size=200&bold=true`;
  };

  return (
    <div className="min-h-screen bg-[#fbfaf4]">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Header & Image */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
              <img
                src={getProfileImage()}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {isEditing && (
              <label className="mt-3 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition shadow-sm border border-gray-300">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Change Photo
              </label>
            )}

            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {userData.name}
            </h1>
            <span
              className={`mt-1 px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                userData.role === "mentor"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {userData.role}
            </span>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`mt-6 px-6 py-2 rounded-full font-bold text-white transition-all shadow-lg flex items-center gap-2 ${
                isEditing
                  ? "bg-green-600 hover:bg-green-700 hover:shadow-green-500/30"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30"
              }`}
            >
              {isEditing ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Save Changes
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            {/* Common Info */}
            <div className="space-y-2">
              <label className="font-bold">Full Name</label>
              <input
                disabled={!isEditing}
                value={userData.name || ""}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold">Email (Read Only)</label>
              <input
                disabled
                value={userData.email || ""}
                className="w-full p-3 rounded-xl bg-gray-200 border border-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold">Contact</label>
              <input
                disabled={!isEditing}
                value={userData.contact || ""}
                onChange={(e) =>
                  setUserData({ ...userData, contact: e.target.value })
                }
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            {/* Degree is now available for both Students and Mentors */}
            <div className="space-y-2">
              <label className="font-bold">Degree</label>
              <select
                disabled={!isEditing}
                value={userData.degree || ""}
                onChange={(e) =>
                  setUserData({ ...userData, degree: e.target.value })
                }
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                {degreeOptions.map((opt) => (
                  <option key={opt} value={opt === "Select" ? "" : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-bold">Branch</label>
              <select
                disabled={!isEditing}
                value={userData.branch || ""}
                onChange={(e) =>
                  setUserData({ ...userData, branch: e.target.value })
                }
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                {branches.map((opt) => (
                  <option key={opt} value={opt === "Select" ? "" : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Mentor Specific Fields */}
            {userData.role === "mentor" && (
              <>
                <div className="space-y-2">
                  <label className="font-bold">Year of Graduation</label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={userData.YOG || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, YOG: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold">Current Job Title</label>
                  <input
                    disabled={!isEditing}
                    value={userData.jobTitle || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, jobTitle: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold">Current Company</label>
                  <input
                    disabled={!isEditing}
                    value={userData.currentCompany || ""}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        currentCompany: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold">Years of Experience</label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={userData.experience || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, experience: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold">Target Student Level</label>
                  <select
                    disabled={!isEditing}
                    value={userData.level || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, level: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    {levelOptions.map((opt) => (
                      <option key={opt} value={opt === "Select" ? "" : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-bold">Time Commitment</label>
                  <select
                    disabled={!isEditing}
                    value={userData.Commitment || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, Commitment: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    {commitmentOptions.map((opt) => (
                      <option key={opt} value={opt === "Select" ? "" : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-bold block mb-2">Service Type</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        disabled={!isEditing}
                        name="serviceType"
                        checked={userData.serviceType === "free"}
                        onChange={() =>
                          setUserData({ ...userData, serviceType: "free" })
                        }
                      />
                      Free
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        disabled={!isEditing}
                        name="serviceType"
                        checked={userData.serviceType === "paid"}
                        onChange={() =>
                          setUserData({ ...userData, serviceType: "paid" })
                        }
                      />
                      Paid
                    </label>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="font-bold">
                    Previous Companies (Comma separated)
                  </label>
                  <textarea
                    disabled={!isEditing}
                    value={companyString}
                    onChange={(e) => setCompanyString(e.target.value)}
                    placeholder="e.g. Amazon, Google, Startup"
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500 h-20"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="font-bold">
                    Hackathon Experience (Comma separated)
                  </label>
                  <textarea
                    disabled={!isEditing}
                    value={hackathonString}
                    onChange={(e) => setHackathonString(e.target.value)}
                    placeholder="e.g. SIH 2024, HackOct, Local Hack"
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500 h-20"
                  />
                </div>
              </>
            )}

            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="font-bold">
                Skills & Expertise (Comma separated)
              </label>
              <textarea
                disabled={!isEditing}
                value={skillString}
                onChange={(e) => setSkillString(e.target.value)}
                placeholder="e.g. Python, Java, Leadership"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100 disabled:text-gray-500 h-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;
