"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const RegistrationContent = () => {
  const [image, setImage] = useState("");

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size is too big! Please upload an image under 2MB.");
        return;
      }
      try {
        const base64 = await convertToBase64(file);
        setImage(base64);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  const searchParams = useSearchParams();
  const initialRole =
    searchParams.get("role") === "mentor" ? "mentor" : "student";
  const [role, setRole] = useState(initialRole);
  const [companies, setCompanies] = useState([]);
  const [companyInput, setCompanyInput] = useState("");
  const [hackathons, setHackathons] = useState([]);
  const [hackathonInput, setHackathonInput] = useState("");
  const [mentorSkills, setMentorSkills] = useState([]);
  const [mentorSkillInput, setMentorSkillInput] = useState("");
  const [studentSkills, setStudentSkills] = useState([]);
  const [studentSkillInput, setStudentSkillInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [branch, setBranch] = useState("");
  const [degree, setDegree] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [YOG, setYOG] = useState("");
  const [level, setLevel] = useState("");
  const [Commitment, setCommitment] = useState("");
  const [serviceType, setServiceType] = useState("free");
  const [confirmPass, setConfirmPass] = useState("");
  const [collegeName, setCollegeName] = useState(
    "Odisha University of Technology and Research",
  );

  const addCompany = () => {
    if (companyInput.trim() === "") return;
    setCompanies([...companies, companyInput.trim()]);
    setCompanyInput("");
  };
  const removeCompany = (index) => {
    setCompanies(companies.filter((_, i) => i !== index));
  };

  const addHackathon = () => {
    if (hackathonInput.trim() === "") return;
    setHackathons([...hackathons, hackathonInput.trim()]);
    setHackathonInput("");
  };
  const removeHackathon = (index) => {
    setHackathons(hackathons.filter((_, i) => i !== index));
  };

  const addMentorSkills = () => {
    if (mentorSkillInput.trim() === "") return;

    const newSkill = { id: Date.now(), name: mentorSkillInput.trim() };
    setMentorSkills((prev) => [...prev, newSkill]);
    setMentorSkillInput("");
  };
  const removeMentorSkills = (id) => {
    setMentorSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const addStudentSkills = () => {
    const val = studentSkillInput.trim();
    if (val === "") return;

    const newSkill = { id: Date.now(), value: val };
    setStudentSkills((prev) => [...prev, newSkill]);
    setStudentSkillInput("");
  };
  const removeStudentSkills = (id) => {
    setStudentSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const SubmitStudent = async () => {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!degree) {
      alert("Degree is required");
      return;
    }

    if (studentSkills.length === 0) {
      alert("Please add at least one skill");
      return;
    }
    if (password !== confirmPass) {
      alert(`Password and Confirm Password should be same`);
      return;
    }
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "student",
          name,
          image,
          email,
          contact,
          degree,
          branch,
          skills: studentSkills.map((s) => s.value),
          password,
        }),
      });
      const data = await res.json();
      console.log("Student Response:", data);
      if (res.ok && data.success) {
        alert("You registered successfully");
        setName("");
        setEmail("");
        setDegree("");
        setContact("");
        setBranch("");
        setPassword("");
        setConfirmPass("");
        setStudentSkills([]);
        setStudentSkillInput("");
        setImage("");
      } else if (!res.ok) {
        alert(data.message);
        return;
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const submitMentor = async () => {
    if (
      !name ||
      !email ||
      !degree ||
      !YOG ||
      mentorSkills.length === 0 ||
      !level ||
      !Commitment ||
      !serviceType ||
      !password
    ) {
      alert("Please fill all mandatory mentor fields");
      return;
    }
    if (password !== confirmPass) {
      alert("Password and Confirm Password should be same");
      return;
    }
    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "mentor",
          name,
          image,
          email,
          contact,
          degree,
          branch,
          YOG,
          jobTitle,
          currentCompany,
          experience,
          companies,
          hackathons,
          skills: mentorSkills.map((s) => s.name),
          level,
          Commitment,
          serviceType,
          password,
        }),
      });

      const data = await res.json();
      console.log("Mentor Response:", data);
      if (res.ok && data.success) {
        alert("You registered successfully");
        setName("");
        setImage("");
        setEmail("");
        setContact("");
        setDegree("");
        setBranch("");
        setYOG("");
        setJobTitle("");
        setCurrentCompany("");
        setExperience("");
        setCompanies([]);
        setCompanyInput("");
        setHackathons([]);
        setHackathonInput("");
        setMentorSkills([]);
        setMentorSkillInput("");
        setLevel("");
        setCommitment("");
        setServiceType("free");
        setPassword("");
        setConfirmPass("");
      } else if (!res.ok) {
        alert(data.message);
        return;
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
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

  const [open, setOpen] = useState(false);

  return (
    <section className="min-h-screen bg-[#fbfaf4] py-20">
      <div className="mx-auto max-w-6xl rounded-4xl md:rounded-[3rem] bg-white shadow-2xl px-6 md:px-10 py-10 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-800">
            Registration
          </h1>
          <p className="text-blue-600 mt-2">
            Already a registered user?{" "}
            <Link href="/login" className="font-semibold hover:underline">
              Click here to Login
            </Link>
          </p>
        </div>

        <div className="flex justify-center gap-10 mb-14 text-blue-700 font-semibold">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            Signup as Student
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="mentor"
              checked={role === "mentor"}
              onChange={() => setRole("mentor")}
            />
            Signup as Mentor
          </label>
        </div>

        {role === "student" && (
          <div className="mx-auto max-w-xl rounded-3xl bg-[#f7f6f2] shadow-xl p-10">
            <div className="flex flex-col items-center mb-10">
              {image ? (
                <img
                  src={image}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-blue-400 flex items-center justify-center text-xs text-blue-400">
                  Upload Photo
                </div>
              )}

              {/* --- STUDENT INPUT: Fixed onChange --- */}
              <input
                type="file"
                accept="image/*"
                className="mt-4 text-sm border-[#ab9cdd] border-2 rounded-full "
                onChange={handleImageUpload}
              />
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Name*
                </label>
                <input
                  value={name}
                  required
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  pattern="^[0-9]{10,15}$"
                  maxLength="15"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Degree*
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                  className="w-full rounded-xl bg-[#ab9cdd] text-blue-50 py-2"
                >
                  <option>Select</option>
                  <option>BTech</option>
                  <option>MTech</option>
                  <option>MBA</option>
                  <option>PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Branch
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-[#ab9cdd] text-blue-50 px-4 py-2 text-left"
                    onClick={() => setOpen(!open)}
                  >
                    {branch || "Select Branch"}
                  </button>

                  {open && (
                    <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl bg-[#ab9cdd] text-blue-50 shadow-xl">
                      {branches.map((b) => (
                        <div
                          key={b}
                          onClick={() => {
                            setBranch(b);
                            setOpen(false);
                          }}
                          className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-700"
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Skills*
                </label>
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Python"
                    value={studentSkillInput}
                    required
                    onChange={(e) => setStudentSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addStudentSkills()}
                      className="
      w-full
        rounded-xl bg-[#ab9cdd]
        px-4 py-2
        text-white
        focus:outline-none
    "
                  />
                  <button
                    type="button"
                    onClick={addStudentSkills}
                    className=" w-full sm:w-auto
        bg-blue-700 text-white font-semibold
        px-4 py-2
        rounded-xl
        shrink-0"
                  >
                    Add
                  </button>
                </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {studentSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {skill.value}
                      <button
                        type="button"
                        onClick={() => removeStudentSkills(skill.id)}
                        className="text-blue-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Create Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                  >
                    <i
                      className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Confirm Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white pr-10"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                  >
                    <i
                      className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={SubmitStudent}
                className="w-full mt-6 rounded-2xl bg-purple-900 py-3 font-semibold text-white hover:bg-purple-800 transition"
              >
                Create Account
              </button>
            </div>
          </div>
        )}
        {role === "mentor" && (
          <div className="mx-auto max-w-xl rounded-3xl bg-[#f7f6f2] shadow-xl p-10">
            <div className="flex flex-col items-center mb-10">
              {image ? (
                <img
                  src={image}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-blue-400 flex items-center justify-center text-xs text-blue-400">
                  Upload Photo
                </div>
              )}

              {/* --- MENTOR INPUT: Fixed onChange --- */}
              <input
                type="file"
                accept="image/*"
                className="mt-4 text-sm border-[#ab9cdd] border-2 rounded-full "
                onChange={handleImageUpload}
              />
            </div>

            <div className="space-y-6">
              <label className="text-1xl font-bold">Basic Information</label>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Name*
                </label>
                <input
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Contact Number
                </label>
                <input
                  type="number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                />
              </div>

              <label className="text-1xl font-bold">Academic Background</label>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  College Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                  value={collegeName}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Degree*
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                  className="w-full rounded-xl bg-[#ab9cdd] text-blue-50 py-2"
                >
                  <option>Select</option>
                  <option>BTech</option>
                  <option>MTech</option>
                  <option>MBA</option>
                  <option>PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Branch
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-[#ab9cdd] text-blue-50 px-4 py-2 text-left"
                    onClick={() => setOpen(!open)}
                  >
                    {branch || "Select Branch"}
                  </button>

                  {open && (
                    <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl bg-[#ab9cdd] text-blue-50 shadow-xl">
                      {branches.map((b) => (
                        <div
                          key={b}
                          onClick={() => {
                            setBranch(b);
                            setOpen(false);
                          }}
                          className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-700"
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="yearOfGraduation"
                  className="block text-sm font-semibold mb-1"
                >
                  Year of Graduation*
                </label>
                <input
                  type="number"
                  name="yearOfGraduation"
                  id="yearOfGraduation"
                  value={YOG}
                  onChange={(e) => setYOG(e.target.value)}
                  required
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                />
              </div>
              <label className="text-1xl font-bold">Professional Status</label>
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-semibold mb-1"
                >
                  Current Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="currentCompany"
                  className="block text-sm font-semibold mb-1"
                >
                  Current Company
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  id="currentCompany"
                  value={currentCompany}
                  onChange={(e) => setCurrentCompany(e.target.value)}
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-semibold mb-1"
                >
                  Total Years of Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Previous Companies
                </label>
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Amazon"
                      value={companyInput}
                      onChange={(e) => setCompanyInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addCompany()}
                      // className="w-full rounded-xl bg-[#ab9cdd] pr-20 px-4 py-2 text-white focus:outline-none"
                      className="
      w-full
        rounded-xl bg-[#ab9cdd]
        px-4 py-2
        text-white
        focus:outline-none
    "
                    />
                    <button
                      type="button"
                      onClick={addCompany}
                      className=" w-full sm:w-auto
        bg-blue-700 text-white font-semibold
        px-4 py-2
        rounded-xl
        shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {companies.map((company, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {company}
                      <button
                        type="button"
                        onClick={() => removeCompany(index)}
                        className="text-blue-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Hackathon Experience
                </label>
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SIH"
                      value={hackathonInput}
                      onChange={(e) => setHackathonInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addHackathon()}
                      className="
      w-full
        rounded-xl bg-[#ab9cdd]
        px-4 py-2
        text-white
        focus:outline-none
    "
                    />
                    <button
                      type="button"
                      onClick={addHackathon}
                      className=" w-full sm:w-auto
        bg-blue-700 text-white font-semibold
        px-4 py-2
        rounded-xl
        shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {hackathons.map((hackathon, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {hackathon}
                      <button
                        type="button"
                        onClick={() => removeHackathon(index)}
                        className="text-blue-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Skills & Expertise*
                </label>
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Python"
                      value={mentorSkillInput}
                      required
                      onChange={(e) => setMentorSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addMentorSkills()}
                      className="
      w-full
        rounded-xl bg-[#ab9cdd]
        px-4 py-2
        text-white
        focus:outline-none
    "
                    />
                    <button
                      type="button"
                      onClick={addMentorSkills}
                      className=" w-full sm:w-auto
        bg-blue-700 text-white font-semibold
        px-4 py-2
        rounded-xl
        shrink-0"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mentorSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                    >
                      {skill.name}
                      <button
                        type="button"
                        onClick={() => removeMentorSkills(skill.id)}
                        className="text-blue-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <label className="text-1xl font-bold">
                Mentorship Preferences
              </label>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Target Student Level*
                </label>
                <select
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2"
                  value={level}
                  required
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option>Select</option>
                  <option>1st-2nd Year</option>
                  <option>3rd Year</option>
                  <option>Final Year</option>
                  <option>Fresh Graduates</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Time Commitment*
                </label>
                <select
                  className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2"
                  value={Commitment}
                  required
                  onChange={(e) => setCommitment(e.target.value)}
                >
                  <option>Select</option>
                  <option>1–2 hrs/week</option>
                  <option>3–5 hrs/week</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div className="flex justify-center gap-10 mb-2 text-blue-700 font-semibold">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="service"
                    checked={serviceType === "free"}
                    onChange={() => setServiceType("free")}
                  />
                  Free Service
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="service"
                    checked={serviceType === "paid"}
                    onChange={() => setServiceType("paid")}
                  />
                  Paid Service
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Create Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                  >
                    <i
                      className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Confirm Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-xl bg-[#ab9cdd] px-4 py-2 text-white pr-10"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                  >
                    <i
                      className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={submitMentor}
                className="w-full mt-6 rounded-2xl bg-purple-900 py-3 font-semibold text-white hover:bg-purple-800 transition"
              >
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const RegistrationPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbfaf4] flex items-center justify-center">
          <div className="text-xl text-blue-800 font-bold">
            Loading Registration...
          </div>
        </div>
      }
    >
      <RegistrationContent />
    </Suspense>
  );
};

export default RegistrationPage;
