"use client";
import React, { useState, useEffect, Suspense } from "react";

const ProfileContent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [hackathonInput, setHackathonInput] = useState("");

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

  const addItem = (field, value, setInput) => {
    if (!value.trim()) return;
    const currentArray = userData[field] || [];
    setUserData({ ...userData, [field]: [...currentArray, value.trim()] });
    setInput("");
  };

  const removeItem = (field, index) => {
    const newArray = userData[field].filter((_, i) => i !== index);
    setUserData({ ...userData, [field]: newArray });
  };

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
      if (file.size > 2 * 1024 * 1024) return alert("File too big (Max 2MB)");
      const base64 = await convertToBase64(file);
      setUserData({ ...userData, image: base64 });
    }
  };

  const handleSave = async () => {
    if (!userData.name?.trim()) return alert("Name is required");
    if (!userData.degree || userData.degree === "Select")
      return alert("Degree is required");
    if (!userData.branch || userData.branch === "Select")
      return alert("Branch is required");
    const skills = userData.skills || [];
    if (skills.length === 0) return alert("Please add at least one Skill");

    if (userData.role === "mentor") {
      if (!userData.YOG) return alert("Year of Graduation is required");
      if (!userData.level || userData.level === "Select")
        return alert("Target Student Level is required");
      if (!userData.Commitment || userData.Commitment === "Select")
        return alert("Time Commitment is required");
      if (!userData.serviceType) return alert("Service Type is required");
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
        alert("Update failed: " + data.message);
      }
    } catch (err) {
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
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D8ABC&color=fff&size=200&bold=true`;
  };

  return (
    <div className="min-h-screen bg-[#fbfaf4]">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <img
                src={getProfileImage()}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
              />
              {isEditing && (
                <input
                  type="file"
                  className="absolute bottom-0 right-0 w-8 cursor-pointer"
                  onChange={handleImageChange}
                />
              )}
            </div>
            <h1 className="text-3xl font-bold mt-4 text-gray-800">
              {userData.name}
            </h1>
            <span className="capitalize px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold mt-2">
              {userData.role}
            </span>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`mt-6 px-8 py-2 rounded-full font-bold text-white transition-all shadow-lg ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-2">
              <label className="font-bold">Full Name *</label>
              <input
                disabled={!isEditing}
                value={userData.name || ""}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full p-3 border rounded-xl disabled:bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold">Email (Read Only)</label>
              <input
                disabled
                value={userData.email || ""}
                className="w-full p-3 border rounded-xl bg-gray-200 cursor-not-allowed"
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
                className="w-full p-3 border rounded-xl disabled:bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold">Degree *</label>
              <select
                disabled={!isEditing}
                value={userData.degree || ""}
                onChange={(e) =>
                  setUserData({ ...userData, degree: e.target.value })
                }
                className="w-full p-3 border rounded-xl disabled:bg-gray-100"
              >
                {degreeOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 relative">
              <label className="font-bold">Branch *</label>
              <button
                type="button"
                disabled={!isEditing}
                onClick={() => setOpen(!open)}
                className="w-full p-3 border rounded-xl text-left disabled:bg-gray-100 flex justify-between items-center"
              >
                <span>{userData.branch || "Select Branch"}</span>
                {isEditing && <span className="text-xs">▼</span>}
              </button>
              {open && isEditing && (
                <div className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border rounded-xl shadow-lg">
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

            {userData.role === "mentor" && (
              <>
                <div className="space-y-2">
                  <label className="font-bold">Graduation Year *</label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={userData.YOG || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, YOG: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold">Job Title</label>
                  <input
                    disabled={!isEditing}
                    value={userData.jobTitle || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, jobTitle: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold">Company</label>
                  <input
                    disabled={!isEditing}
                    value={userData.currentCompany || ""}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        currentCompany: e.target.value,
                      })
                    }
                    className="w-full p-3 border rounded-xl disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold">Experience (Years)</label>
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={userData.experience || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, experience: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-bold">Target Level *</label>
                  <select
                    disabled={!isEditing}
                    value={userData.level || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, level: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl disabled:bg-gray-100"
                  >
                    {levelOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-bold">Commitment *</label>
                  <select
                    disabled={!isEditing}
                    value={userData.Commitment || ""}
                    onChange={(e) =>
                      setUserData({ ...userData, Commitment: e.target.value })
                    }
                    className="w-full p-3 border rounded-xl disabled:bg-gray-100"
                  >
                    {commitmentOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

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
                      placeholder="Add company..."
                      className="w-full p-2 border rounded-xl disabled:bg-gray-100"
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
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {c}{" "}
                        {isEditing && (
                          <button
                            onClick={() => removeItem("companies", i)}
                            className="ml-1 text-red-500 font-bold"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="font-bold">Hackathons</label>
                  <div className="flex gap-2">
                    <input
                      disabled={!isEditing}
                      value={hackathonInput}
                      onChange={(e) => setHackathonInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        addItem("hackathons", hackathonInput, setHackathonInput)
                      }
                      placeholder="Add hackathon..."
                      className="w-full p-2 border rounded-xl disabled:bg-gray-100"
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
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {h}{" "}
                        {isEditing && (
                          <button
                            onClick={() => removeItem("hackathons", i)}
                            className="ml-1 text-red-500 font-bold"
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

            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="font-bold">Skills *</label>
              <div className="flex gap-2">
                <input
                  disabled={!isEditing}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    addItem("skills", skillInput, setSkillInput)
                  }
                  placeholder="Add skill..."
                  className="w-full p-2 border rounded-xl disabled:bg-gray-100"
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
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {s}{" "}
                    {isEditing && (
                      <button
                        onClick={() => removeItem("skills", i)}
                        className="ml-1 text-red-500 font-bold"
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
  <Suspense fallback={<div>Loading...</div>}>
    <ProfileContent />
  </Suspense>
);
export default ProfilePage;
