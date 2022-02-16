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
function getData(mode, voivodeshipID) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, body;
        return __generator(this, function (_a) {
            headers = { "Content-Type": 'application/x-www-form-urlencoded' };
            body = "data=" + JSON.stringify({ mode: mode, void_id: voivodeshipID });
            return [2 /*return*/, fetch("data.php", { method: "post", body: body, headers: headers })
                    .then(function (response) {
                    if (!response.ok)
                        throw new Error(response.statusText);
                    return response.json();
                })
                    .then(function (data) {
                    // console.log( data );
                    return data;
                })];
        });
    });
}
function createTable(arr, dataType, voivodeshipName) {
    var _this = this;
    var table = document.createElement("table");
    table.id = "table";
    var thead = document.createElement("thead");
    var row = document.createElement("tr");
    var td = document.createElement("td");
    document.getElementById("goBack").style.display = dataType == "c" ? "flex" : "none";
    if (dataType == "v") {
        arr.map(function (obj, i) {
            obj.NAZWA = obj.NAZWA.toLowerCase();
        });
    }
    td = document.createElement("td");
    td.innerText = "Nr";
    row = document.createElement("tr");
    row.appendChild(td);
    td = document.createElement("td");
    var str = (voivodeshipName === null || voivodeshipName === void 0 ? void 0 : voivodeshipName.substring(0, (voivodeshipName === null || voivodeshipName === void 0 ? void 0 : voivodeshipName.length) - 1)) + "m";
    td.innerText = "Nazwa " + (dataType == "v" ? "województwa" : "miasta w woj. " + str);
    row.appendChild(td);
    thead.appendChild(row);
    table.appendChild(thead);
    console.log(arr);
    var tbody = document.createElement("tbody");
    arr.map(function (obj, i) {
        var row = document.createElement("tr");
        var td = document.createElement("td");
        td.innerText = (i + 1).toString();
        row.appendChild(td);
        td = document.createElement("td");
        var name = obj.NAZWA;
        td.innerText = name;
        if (dataType == "v") {
            td.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = refreshTable;
                            _b = createTable;
                            return [4 /*yield*/, getData("cities", obj.WOJ)];
                        case 1:
                            _a.apply(void 0, [_b.apply(void 0, [_c.sent(), "c", obj.NAZWA])]);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        row.appendChild(td);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    return table;
}
function refreshTable(newTable) {
    var _a;
    var t = document.getElementById("table");
    (_a = t.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(t);
    document.body.appendChild(newTable);
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var data, button;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getData("voivodeships")];
                case 1:
                    data = _a.sent();
                    button = document.createElement("button");
                    button.id = "goBack";
                    button.type = "button";
                    button.innerText = "Powrót";
                    button.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = refreshTable;
                                    _b = createTable;
                                    return [4 /*yield*/, getData("voivodeships")];
                                case 1:
                                    _a.apply(void 0, [_b.apply(void 0, [_c.sent(), "v"])]);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    document.body.appendChild(button);
                    document.body.appendChild(createTable(data, "v")); // v - voivodeships, c - cities
                    return [2 /*return*/];
            }
        });
    });
}
