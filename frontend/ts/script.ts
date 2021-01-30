// import API from "./api";
var API: any;
var gapi: any;
const client = new API.Client();
const onSignIn = async (gu: any) => {
    var token = gu.getAuthResponse().id_token;
    try {
        var a = await client.loginWithGoogle(token);
    } catch (e) {
        throw e;
    }
    if (a) {
        console.log("Google authorized.");
    } else {
        console.log("Google authorization failed!");
    }
}
const onXingAuthLogin = async (response: any) => {
    if (response.user) {
        console.log(response);
        var r = client.loginWithXing(response.user).catch(console.error);
    }
}
const lil = document.getElementById("linkedInLogin");
if (lil != null) {
    lil.onclick = () => {
        var url = encodeURI(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${"86lbtt9pjjyubr"}&scope=r_emailaddress r_liteprofile&state=123456&redirect_uri=${"http://localhost:8887/frontend/"}`);
        window.location.href = url;
    }
}
var linkedInCode: string = "";
try {
    const param = decodeURI(window.location.href).split("?")[1].split("&").map(v => ({ key: v.split("=")[0], value: v.split("=")[1] })).find(v => v.key == "code");
    if (param) {
        linkedInCode = param.value;
    }
} catch (e) {
    linkedInCode = "";
}
if (linkedInCode) {
    client.loginWithLinkedIn(linkedInCode);
    history.pushState(null, "", window.location.href.split("?")[0]);
}
async function loginWithPassword() {
    var h: any = document.getElementById("emailLogin");
    var email: HTMLInputElement = h;
    h = document.getElementById("passwordLogin");
    var password: HTMLInputElement = h;
    if (!email || !password) return;
    console.log(await client.login(email.value, password.value));
}
async function registerWithPassword() {
    var h: any = document.getElementById("emailRegister")
    var email: HTMLInputElement = h;
    h = document.getElementById("passwordRegister");
    var password: HTMLInputElement = h;
    h = document.getElementById("nameRegister");
    var name: HTMLInputElement = h;
    if (!name || !password || !email) return;
    console.log(await client.register(email.value, password.value, name.value));
}
async function logout() {
    await client.logout();
    linkedInCode = "";
    gapi.auth2.getAuthInstance().signOut().then(function () {
        console.log('User signed out.');
    });
    const profileDiv = document.getElementById("profile");
    if (!profileDiv) return;
    profileDiv.style.display = "none";
    return;
}
client.on("login", async (type: any) => {
    const profileDiv = document.getElementById("profile");
    if (!profileDiv) return;
    profileDiv.style.display = "block";
    const userid = document.getElementById("userid");
    if (!userid) return
    userid.innerText = await client.getId();
    var h: any = document.getElementById("firstname");
    const firstname: HTMLInputElement = h;
    h = document.getElementById("lastname");
    const lastname: HTMLInputElement = h;
    if (!firstname || !lastname) return;
    const name = await client.getName();
    firstname.value = name.split(" ")[0];
    lastname.value = name.split(" ")[name.split(" ").length - 1];
    const email = document.getElementById("email");
    if (!email) return;
    email.innerText = await client.getEmail();
    h = document.getElementById("photo");
    const photo: HTMLImageElement = h;
    if (!photo) return;
    photo.src = await client.getProfilePictureUrl();
});
var lastName = "";
async function saveName() {
    var h: any = document.getElementById("firstname");
    const firstname: HTMLInputElement = h;
    h = document.getElementById("lastname");
    const lastname: HTMLInputElement = h;
    if (!firstname || !lastname) return;
    const name = firstname.value + " " + lastname.value;
    if (name === lastName) return;
    await client.changeName(name);
    lastName = name;
}
var t = document.getElementById("login");
if (t) t.onclick = loginWithPassword;
var t2 = document.getElementById("register");
if (t2) t2.onclick = registerWithPassword;
var t3 = document.getElementById("logout");
if (t3) t3.onclick = () => {
    logout();
}
document.addEventListener("keydown", () => {
    saveName();
});

