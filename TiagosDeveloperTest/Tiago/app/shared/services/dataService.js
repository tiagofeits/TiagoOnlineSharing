﻿!function () { "use strict"; angular.module("app").factory("dataService", ["$http", "$q", function (e, t) { var r = { getUsers: function () { var r = t.defer(); return e.get("/User/Index").then(function (e) { r.resolve(e.data) }, function () { r.reject() }), r.promise }, getUserById: function (r) { var n = t.defer(); return e.get("/User/Details/" + r).then(function (e) { n.resolve(e.data) }, function () { n.reject() }), n.promise }, addUser: function (r) { var n = t.defer(); return e.post("/User/Create", r).then(function () { n.resolve() }, function () { n.reject() }), n.promise }, editUser: function (r) { var n = t.defer(); return e.post("/User/Edit", r).then(function () { n.resolve() }, function () { n.reject() }), n.promise }, deleteUser: function (r) { var n = t.defer(); return e.post("/User/Delete", { id: r }).then(function () { n.resolve() }, function () { n.reject() }), n.promise } }; return r }]) }();