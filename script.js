// ========================================
// Kaizen - AI Resume Builder JS
// ========================================

function addSkill(skill) {
    var skillsTextarea = document.getElementById('skills');
    var currentSkills = skillsTextarea.value.trim();
    
    if (currentSkills) {
        skillsTextarea.value = currentSkills + ', ' + skill;
    } else {
        skillsTextarea.value = skill;
    }
    
    showSkillAddedAnimation();
}

function showSkillAddedAnimation() {
    var btn = event.target;
    var originalText = btn.innerText;
    
    btn.innerText = '✓ Added!';
    btn.style.background = '#9B7ED9';
    btn.style.color = 'white';
    btn.style.borderColor = '#9B7ED9';
    
    setTimeout(function() {
        btn.innerText = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
    }, 1000);
}

function downloadPDF() {
    var resumeContent = document.querySelector('.resume');
    
    if (!resumeContent) {
        alert('Please generate a resume first!');
        return;
    }
    
    var printWindow = window.open('', '_blank');
    
    if (!printWindow) {
        alert('Please allow popups to download!');
        return;
    }
    
    var resumeHTML = resumeContent.innerHTML;
    
    printWindow.document.write('<!DOCTYPE html><html><head><title>Resume</title>');
    printWindow.document.write('<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">');
    printWindow.document.write('<style>');
    printWindow.document.write('* { margin: 0; padding: 0; box-sizing: border-box; }');
    printWindow.document.write('body { font-family: "Playfair Display", serif; font-size: 11pt; line-height: 1.8; color: #000; background: #fff; padding: 50px; max-width: 800px; margin: 0 auto; }');
    printWindow.document.write('.resume-name { font-size: 28pt; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 15px; text-align: center; }');
    printWindow.document.write('.resume-contact { font-size: 10pt; margin-bottom: 25px; color: #333; text-align: center; }');
    printWindow.document.write('.section-title { font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #000; margin: 25px 0 10px; padding-bottom: 4px; }');
    printWindow.document.write('ul { padding-left: 18px; margin: 8px 0; } li { margin-bottom: 4px; }');
    printWindow.document.write('.resume-p { margin-bottom: 10px; text-align: justify; }');
    printWindow.document.write('.resume-details { margin-bottom: 6px; }');
    printWindow.document.write('@page { size: A4; margin: 1.5cm; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<div class="resume">' + resumeHTML + '</div>');
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    
    setTimeout(function() {
        printWindow.print();
    }, 500);
}

function generateResume() {
    function getValue(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    var name = getValue('name');
    var phone = getValue('phone');
    var email = getValue('email');
    var location = getValue('location');
    var linkedin = getValue('linkedin');
    var summary = getValue('summary');

    var degree = getValue('degree');
    var college = getValue('college');
    var graduation = getValue('graduation');

    var skillsInput = getValue('skills');
    var hobbiesInput = getValue('hobbies');

    var roleEl = document.getElementById('role');
    var role = roleEl ? roleEl.value : '';

    if (!name || !skillsInput || !role) {
        document.getElementById('output').innerHTML = '<div class="error-message"><span>⚠️</span> Name, Skills and Role are required.</div>';
        return;
    }

    // Split skills by comma and clean
    var skills = skillsInput.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    var lowerSkills = skills.map(function(s) { return s.toLowerCase(); });
    
    // Split hobbies by comma and clean
    var hobbies = hobbiesInput ? hobbiesInput.split(',').map(function(h) { return h.trim(); }).filter(Boolean) : [];

    // Role Skills mapping
    var roleSkills = {
        'Web Developer': ['HTML', 'CSS', 'JavaScript'],
        'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React'],
        'Backend Developer': ['Node.js', 'Database', 'API'],
        'Full Stack Developer': ['HTML', 'CSS', 'JavaScript', 'Node.js'],
        'Python Developer': ['Python', 'OOP', 'File Handling'],
        'AI Engineer': ['Python', 'Machine Learning', 'Data Analysis'],
        'Data Analyst': ['Excel', 'SQL', 'Python'],
        'Software Engineer': ['Programming', 'Problem Solving', 'Algorithms'],
        'UI/UX Designer': ['Figma', 'Wireframing', 'Prototyping'],
        'Cybersecurity Analyst': ['Networking', 'Security', 'Ethical Hacking']
    };

    var requiredSkills = roleSkills[role] || [];
    var missingSkills = requiredSkills.filter(function(skill) {
        return lowerSkills.indexOf(skill.toLowerCase()) === -1;
    });

    var matchScore = requiredSkills.length ? Math.round(((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100) : 0;

    // Experience handling
    var experienceItems = document.querySelectorAll('.experience-item');
    var experienceHTML = '';

    experienceItems.forEach(function(exp) {
        var jobTitle = exp.querySelector('.jobTitle') ? exp.querySelector('.jobTitle').value.trim() : '';
        var company = exp.querySelector('.company') ? exp.querySelector('.company').value.trim() : '';
        var duration = exp.querySelector('.duration') ? exp.querySelector('.duration').value.trim() : '';

        if (jobTitle || company || duration) {
            experienceHTML += '<div class="resume-details"><strong>' + (jobTitle || 'Position') + '</strong> - ' + (company || 'Company') + ' (' + (duration || 'Present') + ')</div>';
        }
    });

    var experienceSection = experienceHTML !== '' ? '<div class="section-title">Work Experience</div>' + experienceHTML : '';
    var hobbiesSection = hobbies.length ? '<div class="section-title">Hobbies</div><ul>' + hobbies.map(function(h) { return '<li>' + h + '</li>'; }).join('') + '</ul>' : '';

    // FIXED OUTPUT - Now shows actual LinkedIn URL
    document.getElementById('output').innerHTML = 
        '<div class="resume">' +
            // HEADER - Name
            '<h1 class="resume-name">' + name + '</h1>' +
            
            // Contact Info - Now shows actual linkedin URL not just text
            '<div class="resume-contact">' + phone + ' | ' + email + ' | ' + location + (linkedin ? ' | ' + linkedin : '') + '</div>' +
            
            // Professional Summary
            '<div class="section-title">Professional Summary</div>' +
            '<p class="resume-p">' + (summary || 'A motivated and dedicated professional seeking to contribute to a dynamic organization while developing skills and gaining valuable experience.') + '</p>' +
            
            // Skills
            '<div class="section-title">Skills</div>' +
            '<ul>' + skills.map(function(s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
            
            // Education
            '<div class="section-title">Education</div>' +
            '<div class="resume-details"><strong>' + (degree || 'Degree') + '</strong> - ' + (college || 'Institute') + ' (' + (graduation || 'Year') + ')</div>' +
            
            // Work Experience
            experienceSection +
            
            // Hobbies
            hobbiesSection +
            
            // Declaration
            '<div class="section-title">Declaration</div>' +
            '<p class="resume-p">I hereby declare that all the information provided above is true and correct to the best of my knowledge.</p>' +
        '</div>' +
        
        // AI BOX (Pink theme)
        '<div class="ai-box">' +
            '<h2>✨ AI Insights</h2>' +
            '<p class="match-score"><strong>Match Score:</strong> <span class="score-badge ' + (matchScore >= 70 ? 'good' : 'needs-work') + '">' + matchScore + '%</span></p>' +
            '<p class="target-role"><strong>Target Role:</strong> ' + (role || 'Not selected') + '</p>' +
            '<div class="recommendations">' +
                '<p><strong>Recommended Skills:</strong></p>' +
                (missingSkills.length > 0 
                    ? '<div class="missing-skills">' + missingSkills.map(function(s) { return '<span class="skill-tag">+ ' + s + '</span>'; }).join('') + '</div>'
                    : '<p class="no-gaps">🎉 No skill gaps detected! Great match!</p>') +
            '</div>' +
        '</div>';

    document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addExperience() {
    var container = document.getElementById('experienceContainer');
    var experienceDiv = document.createElement('div');
    experienceDiv.className = 'experience-item';
    experienceDiv.innerHTML = '<input type="text" class="jobTitle" placeholder="Job Title"><input type="text" class="company" placeholder="Company Name"><input type="text" class="duration" placeholder="Duration">';
    container.appendChild(experienceDiv);
}

document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card, index) {
        card.style.animationDelay = (index * 0.1) + 's';
    });
});