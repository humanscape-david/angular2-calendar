"use strict";
exports.SET_VIEWMODE = "application:SET_VIEWMODE";
exports.SET_SELECTEDDAY = "application:SET_SELECTEDDAY";
exports.SET_SELECTEDWEEK = "application:SET_SELECTEDWEEK";
exports.SET_SELECTEDMONTH = "application:SET_SELECTEDMONTH";
exports.ADD_MONTH_OVERVIEW = "data:months:ADD_MONTH_OVERVIEW";
exports.SET_APPOINTMENTS_FOR_MONTH = "data:months:SET_APPOINTMENTS_FOR_MONTH";
exports.ADD_APPOINTMENT = "data:months:ADD_APPOINTMENT";
exports.REMOVE_APPOINTMENT = "data:months:REMOVE_APPOINTMENT";
exports.UPDATE_APPOINTMENT = "data:months:UPDATE_APPOINTMENT";
function addAppointment(appointment, day) {
    return {
        type: exports.ADD_APPOINTMENT,
        payload: { appointment: appointment, day: day }
    };
}
exports.addAppointment = addAppointment;
function removeAppointment(id, day) {
    return {
        type: exports.REMOVE_APPOINTMENT,
        payload: { id: id, day: day }
    };
}
exports.removeAppointment = removeAppointment;
function updateAppointment(appointment, day) {
    return {
        type: exports.UPDATE_APPOINTMENT,
        payload: { appointment: appointment, day: day }
    };
}
exports.updateAppointment = updateAppointment;
function setViewMode(viewMode) {
    return {
        type: exports.SET_VIEWMODE,
        payload: { viewMode: viewMode }
    };
}
exports.setViewMode = setViewMode;
function setSelectedMonth(month, year) {
    return {
        type: exports.SET_SELECTEDMONTH,
        payload: { month: month, year: year }
    };
}
exports.setSelectedMonth = setSelectedMonth;
function setSelectedWeek(week, year) {
    return {
        type: exports.SET_SELECTEDWEEK,
        payload: { week: week, year: year }
    };
}
exports.setSelectedWeek = setSelectedWeek;
function setSelectedDay(day, month, year) {
    return {
        type: exports.SET_SELECTEDDAY,
        payload: { day: day, month: month, year: year }
    };
}
exports.setSelectedDay = setSelectedDay;
//# sourceMappingURL=actions.js.map