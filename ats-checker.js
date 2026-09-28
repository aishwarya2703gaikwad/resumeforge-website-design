// ===============================
// GET HTML ELEMENTS
// ===============================

const resumeText = document.getElementById("resumeText");

const jobDescription =
    document.getElementById("jobDescription");

const resumeCount =
    document.getElementById("resumeCount");

const jdCount =
    document.getElementById("jdCount");

const checkButton =
    document.getElementById("checkButton");

const resultSection =
    document.getElementById("resultSection");

const scoreElement =
    document.getElementById("score");

const scoreTitle =
    document.getElementById("scoreTitle");

const scoreMessage =
    document.getElementById("scoreMessage");

const sectionResults =
    document.getElementById("sectionResults");

const keywordResults =
    document.getElementById("keywordResults");

const improvementList =
    document.getElementById("improvementList");


// ===============================
// WORD COUNT
// ===============================

function countWords(text) {

    const words = text
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);

    return words.length;
}


// ===============================
// UPDATE WORD COUNT
// ===============================

resumeText.addEventListener("input", function () {

    const count = countWords(resumeText.value);

    resumeCount.textContent =
        count + " words";
});


jobDescription.addEventListener("input", function () {

    const count = countWords(jobDescription.value);

    jdCount.textContent =
        count + " words";
});


// ===============================
// CLEAN TEXT
// ===============================

function cleanText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s+#.-]/g, " ");
}


// ===============================
// CHECK RESUME SECTIONS
// ===============================

function checkSections(resume) {

    const sections = [

        {
            name: "Contact Information",
            keywords: [
                "email",
                "phone",
                "mobile",
                "contact"
            ]
        },

        {
            name: "Professional Summary",
            keywords: [
                "summary",
                "profile",
                "objective",
                "about"
            ]
        },

        {
            name: "Skills",
            keywords: [
                "skills",
                "technical skills",
                "key skills"
            ]
        },

        {
            name: "Education",
            keywords: [
                "education",
                "qualification",
                "academic"
            ]
        },

        {
            name: "Experience",
            keywords: [
                "experience",
                "work experience",
                "employment"
            ]
        },

        {
            name: "Projects",
            keywords: [
                "projects",
                "project"
            ]
        }

    ];


    let score = 0;

    let html = "";


    sections.forEach(section => {

        const found =
            section.keywords.some(keyword =>
                resume.includes(keyword)
            );


        if (found) {

            score++;

            html += `
                <div class="check-row">
                    <span>${section.name}</span>
                    <span class="good">
                        ✓ Found
                    </span>
                </div>
            `;

        } else {

            html += `
                <div class="check-row">
                    <span>${section.name}</span>
                    <span class="bad">
                        ✕ Missing
                    </span>
                </div>
            `;
        }

    });


    sectionResults.innerHTML = html;


    return score;
}


// ===============================
// EXTRACT JOB KEYWORDS
// ===============================

function extractKeywords(jd) {

    const commonWords = [

        "the",
        "and",
        "for",
        "with",
        "that",
        "this",
        "from",
        "your",
        "you",
        "are",
        "our",
        "will",
        "have",
        "has",
        "job",
        "work",
        "looking",
        "candidate",
        "should",
        "must",
        "their",
        "they",
        "about",
        "into",
        "using",
        "years",
        "year",
        "knowledge",
        "experience",
        "skills"

    ];


    const words = jd
        .toLowerCase()
        .replace(/[^\w+#.-]/g, " ")
        .split(/\s+/)
        .filter(word =>
            word.length > 2 &&
            !commonWords.includes(word)
        );


    // Remove duplicates

    return [...new Set(words)];
}


// ===============================
// CHECK KEYWORDS
// ===============================

function checkKeywords(resume, jd) {

    const keywords =
        extractKeywords(jd);


    const matched = [];

    const missing = [];


    keywords.forEach(keyword => {

        if (resume.includes(keyword)) {

            matched.push(keyword);

        } else {

            missing.push(keyword);

        }

    });


    let html = "";


    html += `
        <p style="margin-bottom:12px;">
            <strong>Matched Keywords</strong>
        </p>
    `;


    if (matched.length > 0) {

        html += `
            <div class="keyword-container">
        `;

        matched.forEach(keyword => {

            html += `
                <span class="keyword">
                    ✓ ${keyword}
                </span>
            `;

        });

        html += `</div>`;

    } else {

        html += `
            <p class="bad">
                No matching keywords found.
            </p>
        `;

    }


    html += `
        <p style="margin:20px 0 12px;">
            <strong>Missing Keywords</strong>
        </p>
    `;


    if (missing.length > 0) {

        html += `
            <div class="keyword-container">
        `;

        missing.forEach(keyword => {

            html += `
                <span class="keyword missing-keyword">
                    ✕ ${keyword}
                </span>
            `;

        });

        html += `</div>`;

    } else {

        html += `
            <p class="good">
                Great! No important keywords are missing.
            </p>
        `;
    }


    keywordResults.innerHTML = html;


    return {
        matched,
        missing,
        total: keywords.length
    };
}


// ===============================
// GENERATE IMPROVEMENTS
// ===============================

function generateImprovements(
    resume,
    sectionScore,
    keywordData
) {

    const improvements = [];


    if (sectionScore < 6) {

        improvements.push(
            "Add all important resume sections such as Summary, Skills, Education, Experience and Projects."
        );

    }


    if (!resume.includes("summary") &&
        !resume.includes("profile") &&
        !resume.includes("objective")) {

        improvements.push(
            "Add a professional summary or career objective."
        );

    }


    if (!resume.includes("skills")) {

        improvements.push(
            "Add a clearly labelled Skills section."
        );

    }


    if (keywordData.missing.length > 0) {

        improvements.push(
            "Review the missing job-description keywords and add relevant skills or experience where they genuinely apply."
        );

    }


    const words = countWords(resume);


    if (words < 150) {

        improvements.push(
            "Your resume appears short. Add relevant projects, achievements or experience details."
        );

    }


    if (words > 1000) {

        improvements.push(
            "Your resume is quite long. Consider removing unnecessary information."
        );

    }


    if (!resume.includes("@")) {

        improvements.push(
            "Add a professional email address."
        );

    }


    if (improvements.length === 0) {

        improvements.push(
            "Your resume has a good basic structure. Review the job-specific keywords and keep your information relevant."
        );

    }


    let html = "";


    improvements.forEach(item => {

        html += `
            <li>${item}</li>
        `;

    });


    improvementList.innerHTML = html;
}


// ===============================
// CALCULATE ATS SCORE
// ===============================

function calculateScore(
    sectionScore,
    keywordData,
    resume
) {

    let score = 0;


    // Sections = 40 points

    score +=
        (sectionScore / 6) * 40;


    // Keywords = 40 points

    if (keywordData.total > 0) {

        score +=
            (keywordData.matched.length /
            keywordData.total) * 40;

    } else {

        score += 25;

    }


    // Resume length = 10 points

    const words =
        countWords(resume);

    if (words >= 250 && words <= 800) {

        score += 10;

    } else if (words >= 150) {

        score += 7;

    } else {

        score += 3;

    }


    // Contact = 10 points

    if (
        resume.includes("@") &&
        (
            resume.includes("phone") ||
            resume.includes("mobile") ||
            /\d{10}/.test(resume)
        )
    ) {

        score += 10;

    } else {

        score += 4;

    }


    return Math.round(score);
}


// ===============================
// SCORE MESSAGE
// ===============================

function getScoreMessage(score) {

    if (score >= 85) {

        return {
            title: "Strong ATS Readiness",
            message:
                "Your resume has a strong structure and good keyword alignment. Review the suggestions below before applying."
        };

    }


    if (score >= 70) {

        return {
            title: "Good ATS Readiness",
            message:
                "Your resume has a good foundation, but a few areas can be improved for better job-description alignment."
        };

    }


    if (score >= 50) {

        return {
            title: "Needs Improvement",
            message:
                "Your resume has some important elements, but several areas need improvement."
        };

    }


    return {
        title: "More Improvement Needed",
        message:
            "Add important resume sections and relevant job-specific information before applying."
    };
}


// ===============================
// MAIN CHECK FUNCTION
// ===============================

checkButton.addEventListener("click", function () {

    const resume =
        cleanText(resumeText.value);


    const jd =
        cleanText(jobDescription.value);


    // Validation

    if (resume.length < 50) {

        alert(
            "Please enter your resume before checking."
        );

        return;
    }


    if (jd.length < 30) {

        alert(
            "Please enter the job description before checking."
        );

        return;
    }


    // Section analysis

    const sectionScore =
        checkSections(resume);


    // Keyword analysis

    const keywordData =
        checkKeywords(
            resume,
            jd
        );


    // Score

    const score =
        calculateScore(
            sectionScore,
            keywordData,
            resume
        );


    // Display score

    scoreElement.textContent =
        score;


    const scoreInfo =
        getScoreMessage(score);


    scoreTitle.textContent =
        scoreInfo.title;


    scoreMessage.textContent =
        scoreInfo.message;


    // Circle progress

    const angle =
        score * 3.6;


    document
        .querySelector(".score-circle")
        .style
        .setProperty(
            "--score-angle",
            angle + "deg"
        );


    // Improvements

    generateImprovements(
        resume,
        sectionScore,
        keywordData
    );


    // Show results

    resultSection.classList.remove(
        "hidden"
    );


    // Scroll to result

    resultSection.scrollIntoView({
        behavior: "smooth"
    });

});