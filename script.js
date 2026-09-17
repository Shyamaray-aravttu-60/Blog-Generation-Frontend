// ============================================
// FASTAPI BACKEND URL
// ============================================

const API_BASE_URL =
    "https://demo-sf6t.onrender.com";



// ============================================
// NAVIGATION
// ============================================

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".section");


    sections.forEach(section => {

        section.classList.remove("active");

    });


    const selectedSection =
        document.getElementById(sectionId);


    selectedSection.classList.add("active");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// ============================================
// SHOW RESULT
// ============================================

function showResult(
    elementId,
    message,
    success = true
) {

    const element =
        document.getElementById(elementId);


    element.style.display = "block";


    element.textContent = message;


    if (success) {

        element.style.color =
            "#166534";

        element.style.background =
            "#dcfce7";

    } else {

        element.style.color =
            "#991b1b";

        element.style.background =
            "#fee2e2";

    }

}



// ============================================
// HOME
// GET /
// ============================================

async function checkAPI() {

    const status =
        document.getElementById(
            "apiStatus"
        );


    status.style.display =
        "block";


    status.textContent =
        "Checking API...";


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/`
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                "API returned an error"
            );

        }


        status.textContent =
            "✅ API is running: " +
            (
                data.message ||
                JSON.stringify(data)
            );


        status.style.background =
            "#dcfce7";


        status.style.color =
            "#166534";


    } catch (error) {

        status.textContent =
            "❌ Could not connect to the FastAPI server.";


        status.style.background =
            "#fee2e2";


        status.style.color =
            "#991b1b";


        console.error(error);

    }

}



// ============================================
// AI CHAT
// POST /chat
// ============================================

async function sendChat() {


    const prompt =
        document
            .getElementById(
                "chatPrompt"
            )
            .value
            .trim();


    const result =
        document.getElementById(
            "chatResult"
        );


    const loading =
        document.getElementById(
            "chatLoading"
        );



    if (!prompt) {

        showResult(
            "chatResult",
            "Please enter a prompt.",
            false
        );

        return;

    }



    loading.style.display =
        "block";


    result.style.display =
        "none";



    try {


        const response =
            await fetch(

                `${API_BASE_URL}/chat`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            prompt: prompt

                        })

                }

            );



        const data =
            await response.json();



        if (!response.ok) {

            throw new Error(

                data.detail
                    ? JSON.stringify(
                        data.detail
                    )
                    : "Chat request failed"

            );

        }



        result.style.display =
            "block";


        result.style.background =
            "#f3f4f6";


        result.style.color =
            "#1f2937";


        result.textContent =
            data.response ||
            "No response received.";



    } catch (error) {


        showResult(

            "chatResult",

            "Error: " +
            error.message,

            false

        );


        console.error(error);



    } finally {


        loading.style.display =
            "none";

    }

}



// ============================================
// BLOG GENERATOR
// POST /get_blog?topic=...
// ============================================

async function generateBlog() {


    const topic =
        document
            .getElementById(
                "blogTopic"
            )
            .value
            .trim();


    const outlineResult =
        document
            .getElementById(
                "outlineResult"
            );


    const blogContent =
        document
            .getElementById(
                "blogContent"
            );


    const loading =
        document
            .getElementById(
                "blogLoading"
            );



    // ========================================
    // VALIDATE TOPIC
    // ========================================

    if (!topic) {

        outlineResult.textContent =
            "Please enter a blog topic.";

        blogContent.textContent =
            "Please enter a blog topic.";

        return;

    }



    // ========================================
    // LOADING
    // ========================================

    loading.style.display =
        "block";


    outlineResult.textContent =
        "Generating outline...";


    blogContent.textContent =
        "Generating blog...";



    try {


        // ====================================
        // API URL
        // ====================================

        const url =
            `${API_BASE_URL}/get_blog?topic=` +
            encodeURIComponent(topic);



        // ====================================
        // API REQUEST
        // ====================================

        const response =
            await fetch(

                url,

                {

                    method: "POST"

                }

            );



        // ====================================
        // RESPONSE
        // ====================================

        const data =
            await response.json();



        // ====================================
        // ERROR
        // ====================================

        if (!response.ok) {

            throw new Error(

                data.detail
                    ? JSON.stringify(
                        data.detail
                    )
                    : "Blog generation failed"

            );

        }



        // ====================================
        // SHOW OUTLINE
        // ====================================

        outlineResult.textContent =
            data.outline ||
            "No outline generated.";



        // ====================================
        // SHOW BLOG
        // ====================================

        blogContent.textContent =
            data.blog ||
            "No blog generated.";



    } catch (error) {


        outlineResult.textContent =
            "Error generating outline.";


        blogContent.textContent =
            "Error: " +
            error.message;


        console.error(error);



    } finally {


        loading.style.display =
            "none";

    }

}



// ============================================
// USER SIGNUP
// POST /user/signup
// ============================================

document
    .getElementById(
        "signupForm"
    )
    .addEventListener(

        "submit",

        async function (event) {


            event.preventDefault();



            const name =
                document
                    .getElementById(
                        "name"
                    )
                    .value
                    .trim();


            const age =
                Number(

                    document
                        .getElementById(
                            "age"
                        )
                        .value

                );


            const email =
                document
                    .getElementById(
                        "email"
                    )
                    .value
                    .trim();


            const gender =
                document
                    .getElementById(
                        "gender"
                    )
                    .value;


            const password =
                document
                    .getElementById(
                        "password"
                    )
                    .value;


            const result =
                document
                    .getElementById(
                        "signupResult"
                    );



            result.style.display =
                "none";



            try {


                const response =
                    await fetch(

                        `${API_BASE_URL}/user/signup`,

                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify({

                                    name: name,

                                    age: age,

                                    email: email,

                                    gender: gender,

                                    password:
                                        password

                                })

                        }

                    );



                const data =
                    await response.json();



                if (!response.ok) {

                    throw new Error(

                        data.detail
                            ? JSON.stringify(
                                data.detail
                            )
                            : "Signup failed"

                    );

                }



                showResult(

                    "signupResult",

                    `Account created successfully!

Name: ${data.name}
Age: ${data.age}
Gender: ${data.gender}`,

                    true

                );



                document
                    .getElementById(
                        "signupForm"
                    )
                    .reset();



            } catch (error) {


                showResult(

                    "signupResult",

                    "Error: " +
                    error.message,

                    false

                );


                console.error(error);

            }

        }

    );



// ============================================
// GET ALL USERS
// GET /all_users
// ============================================

async function getUsers() {


    const result =
        document.getElementById(
            "usersResult"
        );


    const loading =
        document.getElementById(
            "usersLoading"
        );



    loading.style.display =
        "block";


    result.innerHTML =
        "";



    try {


        const response =
            await fetch(

                `${API_BASE_URL}/all_users`

            );



        const data =
            await response.json();



        if (!response.ok) {

            throw new Error(

                data.detail
                    ? JSON.stringify(
                        data.detail
                    )
                    : "Could not retrieve users"

            );

        }



        // ====================================
        // NO USERS
        // ====================================

        if (

            !Array.isArray(data) ||
            data.length === 0

        ) {

            result.innerHTML = `

                <div class="result">

                    No users found.

                </div>

            `;

            return;

        }



        // ====================================
        // CREATE TABLE
        // ====================================

        let tableHTML = `

            <table>

                <thead>

                    <tr>

                        <th>
                            Name
                        </th>

                        <th>
                            Age
                        </th>

                        <th>
                            Gender
                        </th>

                    </tr>

                </thead>

                <tbody>

        `;



        data.forEach(user => {


            tableHTML += `

                <tr>

                    <td>
                        ${escapeHTML(
                            user.name || ""
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            String(
                                user.age || ""
                            )
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            user.gender || ""
                        )}
                    </td>

                </tr>

            `;

        });



        tableHTML += `

                </tbody>

            </table>

        `;



        result.innerHTML =
            tableHTML;



    } catch (error) {


        result.innerHTML = `

            <div
                class="result"
                style="
                    background:#fee2e2;
                    color:#991b1b;
                "
            >

                Error:
                ${escapeHTML(
                    error.message
                )}

            </div>

        `;


        console.error(error);



    } finally {


        loading.style.display =
            "none";

    }

}



// ============================================
// ESCAPE HTML
// ============================================

function escapeHTML(text) {


    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}