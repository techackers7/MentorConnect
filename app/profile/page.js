"use client";
import React, { useState, useEffect, Suspense } from "react";

const ProfileContent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false); // For custom Branch dropdown

  // Temporary States for Array Fields
  const [skillInput, setSkillInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [hackathonInput, setHackathonInput] = useState("");

  // Options matching Registration Page
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

  // Fetch Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.success) {
          setUserData(data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // --- Helper Functions for Arrays ---
  const addItem = (field, value, setInput) => {
    if (!value.trim()) return;
    setUserData({
      ...userData,
      [field]: [...(userData[field] || []), value.trim()],
    });
    setInput("");
  };

  const removeItem = (field, index) => {
    const newArray = userData[field].filter((_, i) => i !== index);
    setUserData({ ...userData, [field]: newArray });
  };

  // --- Image Upload ---
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

  // --- STRICT VALIDATION & SAVE ---
  const handleSave = async () => {
    // 1. Common Mandatory Fields
    if (!userData.name || !userData.name.trim()) {
      alert("Name is required");
      return;
    }
    if (!userData.degree || userData.degree === "Select") {
      alert("Degree is required");
      return;
    }
    if (!userData.branch || userData.branch === "Select") {
      alert("Branch is required");
      return;
    }
    if (!userData.skills || userData.skills.length === 0) {
      alert("Please add at least one Skill");
      return;
    }

    // 2. Mentor Mandatory Fields
    if (userData.role === "mentor") {
      if (!userData.YOG) {
        alert("Year of Graduation is required");
        return;
      }
      if (!userData.level || userData.level === "Select") {
        alert("Target Student Level is required");
        return;
      }
      if (!userData.Commitment || userData.Commitment === "Select") {
        alert("Time Commitment is required");
        return;
      }
      if (!userData.serviceType) {
        alert("Service Type is required");
        return;
      }
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Profile Updated Successfully!");
        setIsEditing(false);
      } else {
        alert("Update failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-blue-800 font-bold text-xl">
        Loading Profile...
      </div>
    );
  if (!userData)
    return (
      <div className="min-h-screen flex justify-center items-center">
        User not found. Please Login.
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
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <img
                src={getProfileImage()}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg transition-transform transform hover:scale-110">
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </label>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              {userData.name}
            </h1>
            <span
              className={`mt-1 px-3 py-1 rounded-full text-sm font-semibold capitalize ${userData.role === "mentor" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
            >
              {userData.role}
            </span>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`mt-6 px-8 py-2 rounded-full font-bold text-white transition-all shadow-lg ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            {/* Common Fields */}
            <div className="space-y-2">
              <label className="font-bold">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                disabled={!isEditing}
                value={userData.name || ""}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
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
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold">
                Degree <span className="text-red-500">*</span>
              </label>
              <select
                disabled={!isEditing}
                value={userData.degree || ""}
                onChange={(e) =>
                  setUserData({ ...userData, degree: e.target.value })
                }
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
              >
                {degreeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Branch Dropdown */}
            <div className="space-y-2 relative">
              <label className="font-bold">
                Branch <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                disabled={!isEditing}
                onClick={() => setOpen(!open)}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-left focus:outline-blue-500 disabled:bg-gray-100 flex justify-between items-center"
              >
                <span>{userData.branch || "Select Branch"}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {open && isEditing && (
                <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg">
                  {branches.map((b) => (
                    <div
                      key={b}
                      onClick={() => {
                        setUserData({ ...userData, branch: b });
                        setOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    >
                      {b}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mentor Specific Fields */}
            {userData.role === "mentor" && (
              <>
                <div className="space-y-2">
                  <label className="font-bold">
                    Year of Graduation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={userData.YOG || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, YOG: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
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
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
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
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
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
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold">
                    Target Student Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    disabled={!isEditing}
                    value={userData.level || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, level: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
                  >
                    {levelOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-bold">
                    Time Commitment <span className="text-red-500">*</span>
                  </label>
                  <select
                    disabled={!isEditing}
                    value={userData.Commitment || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, Commitment: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-blue-500 disabled:bg-gray-100"
                  >
                    {commitmentOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-bold block mb-2">
                    Service Type <span className="text-red-500">*</span>
                  </label>
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
                      />{" "}
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
                      />{" "}
                      Paid
                    </label>
                  </div>
                </div>

                {/* Previous Companies Array */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="font-bold">Previous Companies</label>
                  <div className="flex gap-2">
                    <input
                      disabled={!isEditing}
                      value={companyInput}
                      onChange={(e) => setCompanyInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        addItem("companies", companyInput, setCompanyInput)
                      }
                      placeholder="Type and press enter"
                      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 disabled:bg-gray-100"
                    />
                    <button
                      disabled={!isEditing}
                      onClick={() =>
                        addItem("companies", companyInput, setCompanyInput)
                      }
                      className="bg-blue-600 text-white px-4 rounded-xl disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.companies?.map((c, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {c}{" "}
                        {isEditing && (
                          <button
                            onClick={() => removeItem("companies", i)}
                            className="font-bold hover:text-red-500"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hackathons Array */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="font-bold">Hackathon Experience</label>
                  <div className="flex gap-2">
                    <input
                      disabled={!isEditing}
                      value={hackathonInput}
                      onChange={(e) => setHackathonInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        addItem("hackathons", hackathonInput, setHackathonInput)
                      }
                      placeholder="Type and press enter"
                      className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 disabled:bg-gray-100"
                    />
                    <button
                      disabled={!isEditing}
                      onClick={() =>
                        addItem("hackathons", hackathonInput, setHackathonInput)
                      }
                      className="bg-blue-600 text-white px-4 rounded-xl disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData.hackathons?.map((h, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {h}{" "}
                        {isEditing && (
                          <button
                            onClick={() => removeItem("hackathons", i)}
                            className="font-bold hover:text-red-500"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Skills Array (Common) */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="font-bold">
                Skills & Expertise <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  disabled={!isEditing}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    addItem("skills", skillInput, setSkillInput)
                  }
                  placeholder="e.g. Python (Press Enter)"
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 disabled:bg-gray-100"
                />
                <button
                  disabled={!isEditing}
                  onClick={() => addItem("skills", skillInput, setSkillInput)}
                  className="bg-blue-600 text-white px-4 rounded-xl disabled:opacity-50"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.skills?.map((s, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {s}{" "}
                    {isEditing && (
                      <button
                        onClick={() => removeItem("skills", i)}
                        className="font-bold hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => (
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
export default ProfilePage;
