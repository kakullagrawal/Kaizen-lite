function generateResume() {

    const getValue = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
    };

    const name = getValue("name");
    const phone = getValue("phone");
    const email = getValue("email");
    const location = getValue("location");
    const linkedin = getValue("linkedin");
    const summary = getValue("summary");

    const degree = getValue("degree");
    const college = getValue("college");
    const graduation = getValue("graduation");

    const jobTitle = getValue("jobTitle");
    const company = getValue("company");
    const duration = getValue("duration");

    const skillsInput = getValue("skills");
    const hobbiesInput = getValue("hobbies");

    const roleEl = document.getElementById("role");
    const role = roleEl ? roleEl.value : "";

    // Validation
    if (!name || !skillsInput || !role) {
        document.getElementById("output").innerHTML =
            `<p style="color:red;font-weight:bold;">
                Name, Skills and Role are required.
            </p>`;
        return;
    }

    // Skills
    const skills = skillsInput
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

    const lowerSkills = skills.map(s => s.toLowerCase());

    // Hobbies
    const hobbies = hobbiesInput
        ? hobbiesInput.split(",").map(h => h.trim()).filter(Boolean)
        : [];

    // Role Skills
    const roleSkills = {
        "Web Developer": ["html", "css", "javascript"],
        "Frontend Developer": ["html", "css", "javascript", "react"],
        "Backend Developer": ["node.js", "database", "api"],
        "Full Stack Developer": ["html", "css", "javascript", "node.js"],
        "Python Developer": ["python", "oop", "file handling"],
        "AI Engineer": ["python", "machine learning", "data analysis"],
        "Data Analyst": ["excel", "sql", "python"],
        "Software Engineer": ["programming", "problem solving", "algorithms"],
        "UI/UX Designer": ["figma", "wireframing", "prototyping"],
        "Cybersecurity Analyst": ["networking", "security", "ethical hacking"]
    };

    const requiredSkills = roleSkills[role] || [];

    const missingSkills = requiredSkills.filter(
        skill => !lowerSkills.includes(skill)
    );

    const matchScore = requiredSkills.length
        ? Math.round(
            ((requiredSkills.length - missingSkills.length) /
                requiredSkills.length) * 100
        )
        : 0;

    // Experience
    const experienceHTML =
        (jobTitle || company || duration)
            ? `
                <div style="
                    font-size:18px;
                    font-weight:bold;
                    border-bottom:2px solid black;
                    margin-top:25px;
                    padding-bottom:5px;">
                    EXPERIENCE
                </div>

                <p>
                    Worked as <strong>${jobTitle || "Professional"}</strong>
                    at <strong>${company || "Company"}</strong>
                    for <strong>${duration || "some time"}</strong>.
                </p>
            `
            : "";

    // Hobbies
    const hobbiesHTML =
        hobbies.length
            ? `
                <div style="
                    font-size:18px;
                    font-weight:bold;
                    border-bottom:2px solid black;
                    margin-top:25px;
                    padding-bottom:5px;">
                    HOBBIES
                </div>

                <ul>
                    ${hobbies.map(h => `<li>${h}</li>`).join("")}
                </ul>
            `
            : "";

    document.getElementById("output").innerHTML = `
        <div class="resume">

            <div style="
                font-size:36px;
                font-weight:900;
                text-transform:uppercase;
                letter-spacing:2px;
                border-bottom:3px solid black;
                padding-bottom:10px;
                margin-bottom:15px;">
                ${name}
            </div>

            <div style="
                margin-bottom:20px;
                font-size:15px;">
                ${phone}<br>
                ${email}<br>
                ${location}<br>
                ${linkedin}
            </div>

            <div style="
                font-size:18px;
                font-weight:bold;
                border-bottom:2px solid black;
                margin-top:20px;
                padding-bottom:5px;">
                SUMMARY
            </div>

            <p>${summary || "Motivated individual seeking opportunities to grow professionally."}</p>

            <div style="
                font-size:18px;
                font-weight:bold;
                border-bottom:2px solid black;
                margin-top:25px;
                padding-bottom:5px;">
                SKILLS
            </div>

            <ul>
                ${skills.map(s => `<li>${s}</li>`).join("")}
            </ul>

            <div style="
                font-size:18px;
                font-weight:bold;
                border-bottom:2px solid black;
                margin-top:25px;
                padding-bottom:5px;">
                EDUCATION
            </div>

            <p>
                Completed <strong>${degree || "Degree"}</strong>
                from <strong>${college || "Institute"}</strong>
                in <strong>${graduation || "N/A"}</strong>.
            </p>

            ${experienceHTML}

            ${hobbiesHTML}

            <div style="
                font-size:18px;
                font-weight:bold;
                border-bottom:2px solid black;
                margin-top:25px;
                padding-bottom:5px;">
                DECLARATION
            </div>

            <p>
                I hereby declare that all information provided is true and correct.
            </p>

        </div>

        <div class="ai-box">

            <h2>AI Insights</h2>

            <p>
                <strong>Recommended Skills:</strong>
                ${missingSkills.length
                    ? missingSkills.join(", ")
                    : "No skill gaps detected"}
            </p>

            <p><strong>Target Role:</strong> ${role}</p>

            <p><strong>Match Score:</strong> ${matchScore}%</p>

        </div>
    `;
}