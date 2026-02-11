var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var user = {
    id: 0,
    name: "goku",
    email: "goku@sayan.com",
    isAdmin: true
};
// Uso del type --> assomiglia ad una struct e serve a definire i tipi delle variabili di un oggetto
var user2 = {
    id: 1,
    name: "vegeta",
    email: "vegeta@sayan.com",
    isAdmin: false
};
var updated = makeAdmin(user2);
console.log(updated);
function makeAdmin(user) {
    if (user.isAdmin) {
        console.log("L'utente ".concat(user.name, " \u00E8 gi\u00E0 admin"));
        return user;
    }
    var updatedUser = __assign(__assign({}, user), { isAdmin: true });
    console.log("L'utente ".concat(user.name, " \u00E8 diventato admin"));
    return updatedUser;
}
