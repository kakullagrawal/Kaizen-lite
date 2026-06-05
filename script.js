function generateResume() {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const location = document.getElementById("location").value.trim();
    const linkedin = document.getElementById("linkedin").value.trim();
    const summary = document.getElementById("summary").value.trim();

    const degree = document.getElementById("degree").value.trim();
    const college = document.getElementById("college").value.trim();
    const graduation = document.getElementById("graduation").value.trim();

    const jobTitle = document.getElementById("jobTitle").value.trim();
    const company = document.getElementById("company").value.trim();
    const duration = document.getElementById("duration").value.trim();

    const role = document.getElementById("role").value;

    const skillsInput = document.getElementById("skills").value;

    // ❗ BASIC VALIDATION
    if (!name || !skillsInput) {
        document.getElementById("output").innerHTML =
            "<p style='color:red;font-weight:bold;'>Please enter Name and Skills first.</p>";
        return;
    }

    // SKILLS PROCESSING
    const skills = skillsInput
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    const lowerSkills = skills.map(skill => skill.toLowerCase());

    // ROLE SKILLS DATABASE
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

    // MATCH SCORE
    const matchScore = requiredSkills.length
        ? Math.round(((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100)
        : 0;

    // EXPERIENCE TEXT (more human-like)
    let experienceSection = "";
    if (jobTitle || company || duration) {
        experienceSection = `
            <div class="section-title">EXPERIENCE</div>
            <p>
                I worked as <strong>${jobTitle || "a professional"}</strong>
                at <strong>${company || "an organization"}</strong>
                for <strong>${duration || "some time"}</strong>.
                During this period, I improved my practical skills and teamwork abilities.
            </p>
        `;
    }

    // AUTO SUMMARY (if empty)
    const finalSummary = summary || 
        `Motivated individual with interest in ${role}, focused on building practical skills and gaining real-world experience.`;

    // RESUME OUTPUT
    const resumeHTML = `
        <div class="resume">

            <div class="resume-name">
                ${name.toUpperCase()}
            </div>

            <div class="contact-info">
                ${phone || ""}<br>
                ${email || ""}<br>
                ${location || ""}<br>
                ${linkedin || ""}
            </div>

            <div class="section-title">PROFESSIONAL SUMMARY</div>
            <p>${finalSummary}</p>

            <div class="section-title">SKILLS</div>
            <ul>
                ${skills.map(skill => `<li>${skill}</li>`).join("")}
            </ul>

            <div class="section-title">EDUCATION</div>
            <p>
                Completed <strong>${degree || "Degree"}</strong>
                from <strong>${college || "Institute"}</strong>
                in <strong>${graduation || "N/A"}</strong>.
            </p>

            ${experienceSection}

        </div>

        <div class="ai-box">

            <h2>AI Insights</h2>

            <p><strong>Recommended Skills:</strong>
                ${missingSkills.length ? missingSkills.join(", ") : "No skill gaps detected"}
            </p>

            <p><strong>Target Role:</strong> ${role}</p>

            <p><strong>Match Score:</strong> ${matchScore}%</p>

        </div>
    `;

    document.getElementById("output").innerHTML = resumeHTML;
}