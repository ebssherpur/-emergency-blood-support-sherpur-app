// =======================================
// Home Page Statistics
// =======================================

const donorCount = document.getElementById("donorCount");
const volunteerCount = document.getElementById("volunteerCount");
const requestCount = document.getElementById("requestCount");

if (donorCount) {
    db.ref("users").on("value", function(snapshot) {
        donorCount.innerHTML = snapshot.exists() ? snapshot.numChildren() : 0;
    });
}

if (volunteerCount) {
    db.ref("volunteers").on("value", function(snapshot) {
        volunteerCount.innerHTML = snapshot.exists() ? snapshot.numChildren() : 0;
    });
}

if (requestCount) {
    db.ref("bloodRequests").on("value", function(snapshot) {
        requestCount.innerHTML = snapshot.exists() ? snapshot.numChildren() : 0;
    });
}

// =======================================
// Home Page Notice
// =======================================

const noticeList = document.getElementById("noticeList");

if (noticeList) {

    db.ref("notice").limitToLast(1).on("value", function(snapshot) {

        let html = "কোনো নোটিশ নেই।";

        snapshot.forEach(function(item) {

            const notice = item.val();

            html = `
            <div class="card">
                <h3>📢 Latest Notice</h3>
                <p>${notice.text}</p>
                <small>${notice.date}</small>
            </div>
            `;

        });

        noticeList.innerHTML = html;

    });

}

// =======================================
// Home Gallery
// =======================================

const gallery = document.getElementById("gallery");

if (gallery) {

    db.ref("gallery").limitToLast(6).on("value", function(snapshot) {

        let html = "";

        snapshot.forEach(function(item) {

            const image = item.val();

            html += `
            <img src="${image.url}" 
            style="width:100%;margin:10px 0;border-radius:10px;">
            `;

        });

        if (html != "") {
            gallery.innerHTML = html;
        }

    });

}
// =======================================
// Donor Signup
// =======================================

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

    signupBtn.onclick = function () {

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const blood = document.getElementById("blood").value.trim();
        const district = document.getElementById("district").value.trim();
        const password = document.getElementById("password").value;

        if (name == "" || phone == "" || blood == "" || district == "" || password == "") {

            alert("সব তথ্য পূরণ করুন");
            return;

        }

        db.ref("users/" + phone).once("value").then(function (snapshot) {

            if (snapshot.exists()) {

                alert("এই নম্বরে আগে থেকেই অ্যাকাউন্ট আছে");
                return;

            }

            db.ref("users/" + phone).set({

                name: name,
                phone: phone,
                blood: blood,
                district: district,
                password: password,
                role: "donor"

            }).then(function () {

                alert("Donor Account Created Successfully");

                window.location.href = "login.html";

            });

        });

    };

}

// =======================================
// Login System
// =======================================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn && document.getElementById("password")) {

    loginBtn.onclick = function () {

        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;

        if (phone == "" || password == "") {

            alert("ফোন নম্বর ও পাসওয়ার্ড লিখুন");
            return;

        }

        // Admin Login
        if (phone == "12456789" && password == "ebss21000") {

            localStorage.setItem("role", "admin");

            alert("Admin Login Successful");

            window.location.href = "admin.html";

            return;

        }

        // Donor Login
        db.ref("users/" + phone).once("value").then(function (snapshot) {

            if (snapshot.exists()) {

                const user = snapshot.val();

                if (user.password == password) {

                    localStorage.setItem("role", "donor");
                    localStorage.setItem("name", user.name);
                    localStorage.setItem("phone", user.phone);
                    localStorage.setItem("blood", user.blood);
                    localStorage.setItem("district", user.district);

                    alert("Donor Login Successful");

                    window.location.href = "donor-profile.html";

                    return;

                }

            }

            // Volunteer Login
            db.ref("volunteers").once("value").then(function (vSnapshot) {

                let found = false;

                vSnapshot.forEach(function (child) {

                    const volunteer = child.val();

                    if (
                        volunteer.phone == phone &&
                        volunteer.password == password &&
                        volunteer.status == "Approved"
                    ) {

                        found = true;

                        localStorage.setItem("role", "volunteer");
localStorage.setItem("name", volunteer.name);
localStorage.setItem("phone", volunteer.phone);
localStorage.setItem("email", volunteer.email || "");
localStorage.setItem("blood", volunteer.blood || "");
localStorage.setItem("district", volunteer.district || "");
localStorage.setItem("thana", volunteer.thana || "");
localStorage.setItem("reference", volunteer.reference || "");
                      localStorage.setItem("usedReference", volunteer.usedReference || "");
localStorage.setItem("points", volunteer.points || 0);
localStorage.setItem("managedBlood", volunteer.managedBlood || 0);
localStorage.setItem("addedDonor", volunteer.addedDonor || 0);
localStorage.setItem("addedVolunteer", volunteer.addedVolunteer || 0);

alert("Volunteer Login Successful");

window.location.href = "volunteer-profile.html";

                    }

                });

                if (!found) {

                    alert("ভুল ফোন নম্বর অথবা পাসওয়ার্ড");

                }

            });

        });

    };

}
// =======================================
// Logout System
// =======================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.onclick = function () {

        localStorage.clear();

        alert("Logout Successful");

        window.location.href = "login.html";

    };

}

// =======================================
// Security
// =======================================

// Donor Profile

if (window.location.pathname.includes("donor-profile.html")) {

    if (localStorage.getItem("role") != "donor") {

        alert("Please Login As Donor");

        window.location.href = "login.html";

    }

}

// Volunteer Profile

if (window.location.pathname.includes("volunteer-profile.html")) {

    if (localStorage.getItem("role") != "volunteer") {

        alert("Please Login As Volunteer");

        window.location.href = "login.html";

    }

}

// Admin Panel

if (window.location.pathname.includes("admin.html")) {

    if (localStorage.getItem("role") != "admin") {

        alert("Please Login As Admin");

        window.location.href = "login.html";

    }

}

// =======================================
// Home Buttons
// =======================================

// Blood Request

const bloodRequestBtn = document.getElementById("bloodRequestBtn");

if (bloodRequestBtn) {

    bloodRequestBtn.onclick = function () {

        window.location.href = "blood-request.html";

    };

}

// Become Donor

const donorBtn = document.getElementById("donorBtn");

if (donorBtn) {

    donorBtn.onclick = function () {

        window.location.href = "signup.html";

    };

}

// Become Volunteer

const volunteerBtn = document.getElementById("volunteerBtn");

if (volunteerBtn) {

    volunteerBtn.onclick = function () {

        window.location.href = "volunteer-register.html";

    };

}

// Home Login Button

const homeLoginBtn = document.getElementById("loginBtn");

if (homeLoginBtn && !document.getElementById("password")) {

    homeLoginBtn.onclick = function () {

        window.location.href = "login.html";

    };

}