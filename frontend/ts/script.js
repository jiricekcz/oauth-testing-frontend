"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// import API from "./api";
var API;
var gapi;
var client = new API.Client();
var onSignIn = function (gu) { return __awaiter(void 0, void 0, void 0, function () {
    var token, a, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = gu.getAuthResponse().id_token;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.loginWithGoogle(token)];
            case 2:
                a = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                throw e_1;
            case 4:
                if (a) {
                    console.log("Google authorized.");
                }
                else {
                    console.log("Google authorization failed!");
                }
                return [2 /*return*/];
        }
    });
}); };
var onXingAuthLogin = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var r;
    return __generator(this, function (_a) {
        if (response.user) {
            console.log(response);
            r = client.loginWithXing(response.user).catch(console.error);
        }
        return [2 /*return*/];
    });
}); };
var lil = document.getElementById("linkedInLogin");
if (lil != null) {
    lil.onclick = function () {
        var url = encodeURI("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + "86lbtt9pjjyubr" + "&scope=r_emailaddress r_liteprofile&state=123456&redirect_uri=" + "http://localhost:8887/frontend/");
        window.location.href = url;
    };
}
var linkedInCode = "";
try {
    var param = decodeURI(window.location.href).split("?")[1].split("&").map(function (v) { return ({ key: v.split("=")[0], value: v.split("=")[1] }); }).find(function (v) { return v.key == "code"; });
    if (param) {
        linkedInCode = param.value;
    }
}
catch (e) {
    linkedInCode = "";
}
if (linkedInCode) {
    client.loginWithLinkedIn(linkedInCode);
    history.pushState(null, "", window.location.href.split("?")[0]);
}
function loginWithPassword() {
    return __awaiter(this, void 0, void 0, function () {
        var h, email, password, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    h = document.getElementById("emailLogin");
                    email = h;
                    h = document.getElementById("passwordLogin");
                    password = h;
                    if (!email || !password)
                        return [2 /*return*/];
                    _b = (_a = console).log;
                    return [4 /*yield*/, client.login(email.value, password.value)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function registerWithPassword() {
    return __awaiter(this, void 0, void 0, function () {
        var h, email, password, name, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    h = document.getElementById("emailRegister");
                    email = h;
                    h = document.getElementById("passwordRegister");
                    password = h;
                    h = document.getElementById("nameRegister");
                    name = h;
                    if (!name || !password || !email)
                        return [2 /*return*/];
                    _b = (_a = console).log;
                    return [4 /*yield*/, client.register(email.value, password.value, name.value)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function logout() {
    return __awaiter(this, void 0, void 0, function () {
        var profileDiv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.logout()];
                case 1:
                    _a.sent();
                    linkedInCode = "";
                    gapi.auth2.getAuthInstance().signOut().then(function () {
                        console.log('User signed out.');
                    });
                    profileDiv = document.getElementById("profile");
                    if (!profileDiv)
                        return [2 /*return*/];
                    profileDiv.style.display = "none";
                    return [2 /*return*/];
            }
        });
    });
}
client.on("login", function (type) { return __awaiter(void 0, void 0, void 0, function () {
    var profileDiv, userid, _a, h, firstname, lastname, name, email, _b, photo, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                profileDiv = document.getElementById("profile");
                if (!profileDiv)
                    return [2 /*return*/];
                profileDiv.style.display = "block";
                userid = document.getElementById("userid");
                if (!userid)
                    return [2 /*return*/];
                _a = userid;
                return [4 /*yield*/, client.getId()];
            case 1:
                _a.innerText = _d.sent();
                h = document.getElementById("firstname");
                firstname = h;
                h = document.getElementById("lastname");
                lastname = h;
                if (!firstname || !lastname)
                    return [2 /*return*/];
                return [4 /*yield*/, client.getName()];
            case 2:
                name = _d.sent();
                firstname.value = name.split(" ")[0];
                lastname.value = name.split(" ")[name.split(" ").length - 1];
                email = document.getElementById("email");
                if (!email)
                    return [2 /*return*/];
                _b = email;
                return [4 /*yield*/, client.getEmail()];
            case 3:
                _b.innerText = _d.sent();
                h = document.getElementById("photo");
                photo = h;
                if (!photo)
                    return [2 /*return*/];
                _c = photo;
                return [4 /*yield*/, client.getProfilePictureUrl()];
            case 4:
                _c.src = _d.sent();
                return [2 /*return*/];
        }
    });
}); });
var lastName = "";
function saveName() {
    return __awaiter(this, void 0, void 0, function () {
        var h, firstname, lastname, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    h = document.getElementById("firstname");
                    firstname = h;
                    h = document.getElementById("lastname");
                    lastname = h;
                    if (!firstname || !lastname)
                        return [2 /*return*/];
                    name = firstname.value + " " + lastname.value;
                    if (name === lastName)
                        return [2 /*return*/];
                    return [4 /*yield*/, client.changeName(name)];
                case 1:
                    _a.sent();
                    lastName = name;
                    return [2 /*return*/];
            }
        });
    });
}
var t = document.getElementById("login");
if (t)
    t.onclick = loginWithPassword;
var t2 = document.getElementById("register");
if (t2)
    t2.onclick = registerWithPassword;
var t3 = document.getElementById("logout");
if (t3)
    t3.onclick = function () {
        logout();
    };
document.addEventListener("keydown", function () {
    saveName();
});
