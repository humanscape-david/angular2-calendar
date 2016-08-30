"use strict";
var actions_1 = require("./shared/actions");
var enums_1 = require("./shared/enums");
exports.store = {
    data: dataReducer,
    application: applicationReducer
};
function dataReducer(state, action) {
    if (state === void 0) { state = { monthOverviews: [] }; }
    switch (action.type) {
        case actions_1.ADD_APPOINTMENT:
        case actions_1.REMOVE_APPOINTMENT:
        case actions_1.UPDATE_APPOINTMENT:
            return {
                monthOverviews: monthOverviewsReducer(state.monthOverviews, action)
            };
        default:
            return state;
    }
}
// handles the array of months, if a single action should be taken on a month, it delegates the action to the montOverviewReducer
function monthOverviewsReducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.ADD_APPOINTMENT:
        case actions_1.UPDATE_APPOINTMENT:
        case actions_1.REMOVE_APPOINTMENT:
            var found_1 = false;
            var output = state.map(function (monthOverview) {
                if (monthOverview.month === action.payload.day.month && monthOverview.year === action.payload.day.year) {
                    found_1 = true;
                    return monthOverviewReducer(monthOverview, action);
                }
                return monthOverview;
            });
            // if it's not found, we must create a new one
            if (!found_1) {
                output = state.concat([monthOverviewReducer({
                    year: action.payload.day.year,
                    month: action.payload.day.month,
                    daysWithAppointments: []
                }, action)]);
            }
            return output;
        default:
            return state;
    }
}
function monthOverviewReducer(state, action) {
    switch (action.type) {
        case actions_1.ADD_APPOINTMENT:
        case actions_1.UPDATE_APPOINTMENT:
        case actions_1.REMOVE_APPOINTMENT:
            return {
                year: state.year,
                month: state.month,
                daysWithAppointments: dayWithAppointmentsReducer(state.daysWithAppointments, action)
            };
        default:
            return state;
    }
}
function dayWithAppointmentsReducer(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.REMOVE_APPOINTMENT:
        case actions_1.ADD_APPOINTMENT:
        case actions_1.UPDATE_APPOINTMENT:
            var found_2 = false;
            var output = state.map(function (dayWithAppointments) {
                if (dayWithAppointments.day.day === action.payload.day.day) {
                    found_2 = true;
                    return dayWithAppointmentReducer(dayWithAppointments, action);
                }
                return dayWithAppointments;
            });
            if (!found_2) {
                output = state.concat([dayWithAppointmentReducer({
                    day: action.payload.day,
                    appointments: []
                }, action)]);
            }
            return output;
        default:
            return state;
    }
}
// every change to the events for a day are handled here.
function dayWithAppointmentReducer(state, action) {
    switch (action.type) {
        case actions_1.REMOVE_APPOINTMENT:
            return {
                day: state.day,
                appointments: state.appointments.filter(function (appointment) {
                    return appointment.id !== action.payload.id;
                })
            };
        case actions_1.ADD_APPOINTMENT:
            return {
                day: state.day,
                appointments: state.appointments.concat([action.payload.appointment])
            };
        case actions_1.UPDATE_APPOINTMENT:
            return {
                day: state.day,
                appointments: state.appointments.map(function (appointment) {
                    var _a = action.payload.appointment, description = _a.description, date = _a.date;
                    return appointment.id === action.payload.appointment.id ?
                        Object.assign({}, appointment, { description: description, date: date }) : appointment;
                })
            };
        default:
            return state;
    }
}
function applicationReducer(state, action) {
    if (state === void 0) { state = {
        viewMode: enums_1.ViewMode.Month, selectedDay: null, selectedWeek: null,
        selectedMonth: null
    }; }
    switch (action.type) {
        case actions_1.SET_VIEWMODE:
            return Object.assign({}, state, { viewMode: action.payload.viewMode });
        case actions_1.SET_SELECTEDDAY:
            return Object.assign({}, state, { selectedDay: action.payload });
        case actions_1.SET_SELECTEDWEEK:
            return Object.assign({}, state, { selectedWeek: action.payload });
        case actions_1.SET_SELECTEDMONTH:
            return Object.assign({}, state, { selectedMonth: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=store.js.map