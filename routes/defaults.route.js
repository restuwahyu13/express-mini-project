// @ts-nocheck
// register route

const { Parallel } = require('../helpers/runParallel');

const LoginUsersRoute = require('../routes/register.route/login.route');
const RegisterUsersRoute = require('../routes/register.route/register.route');
const ActivationUsersRoute = require('../routes/register.route/activation.route');
const ResendTokenUserRoute = require('../routes/register.route/resend.route');
const ForgotPasswordUserRoute = require('../routes/register.route/forgot.route');
const ResetPasswordUserRoute = require('../routes/register.route/reset.route');

//role route
const CreateRolesRoute = require('../routes/roles.route/create.route');
const ResultRolesRoute = require('../routes/roles.route/result.route');
const ResultsRolesRoute = require('../routes/roles.route/results.route');
const DeleteRolesRoute = require('../routes/roles.route/delete.route');
const UpdateRolesRoute = require('../routes/roles.route/update.route');

// user route
const CreateUserRoute = require('../routes/users.route/create.route');
const ResultsUserRoute = require('../routes/users.route/results.route');
const ResultUserRoute = require('../routes/users.route/result.route');
const DeleteUserRoute = require('../routes/users.route/delete.route');
const UpdateUserRoute = require('../routes/users.route/update.route');

// credits route
const CreateCreditsRoute = require('../routes/credits.route/create.route');
const ResultsCreditsRoute = require('../routes/credits.route/results.route');
const ResultCreditsRoute = require('../routes/credits.route/result.route');
const DeleteCreditsRoute = require('../routes/credits.route/delete.route');
const UpdateCreditsRoute = require('../routes/credits.route/update.route');

// subject routes
const CreateSubjectRoute = require('../routes/subjects.route/create.route');
const ResultsSubjectRoute = require('../routes/subjects.route/results.route');
const ResultSubjectRoute = require('../routes/subjects.route/result.route');
const DeleteSubjectRoute = require('../routes/subjects.route/delete.route');
const UpdateSubjectRoute = require('../routes/subjects.route/update.route');

class DefaultRoutes {
    constructor(app) {

        this.app = app;
    }

    // function default route controller in here
    Routes() {

        const { app } = this;

        app.use('/', Parallel.run([

            //init register routes
            LoginUsersRoute,
            RegisterUsersRoute,
            ActivationUsersRoute,
            ResendTokenUserRoute,
            ForgotPasswordUserRoute,
            ResetPasswordUserRoute,

            //init user routes
            CreateUserRoute,
            ResultsUserRoute,
            ResultUserRoute,
            DeleteUserRoute,
            UpdateUserRoute,

            //init register routes
            CreateRolesRoute,
            ResultRolesRoute,
            ResultsRolesRoute,
            DeleteRolesRoute,
            UpdateRolesRoute,

            //init credits routes
            CreateCreditsRoute,
            ResultsCreditsRoute,
            ResultCreditsRoute,
            DeleteCreditsRoute,
            UpdateCreditsRoute,

            //init credits routes
            CreateSubjectRoute,
            ResultsSubjectRoute,
            ResultSubjectRoute,
            DeleteSubjectRoute,
            UpdateSubjectRoute

        ]));

        // init roles routes
        // app.use('/role', CreateRolesRoute);
        // app.use('/role', ResultRolesRoute);
        // app.use('/role', ResultsRolesRoute);
        // app.use('/role', UpdateRolesRoute);
        // app.use('/role', DeleteRolesRoute);

        // //init register routes
        // app.use('/login', LoginUsersRoute);
        // app.use('/register', RegisterUsersRoute);
        // app.use('/activation', ActivationUsersRoute);
        // app.use('/resendtoken', ResendTokenUserRoute);
        // app.use('/forgotpassword', ForgotPasswordUserRoute);
        // app.use('/resetpassword', ResetPasswordUserRoute);

        // //init user routes
        // app.use('/user', CreateUserRoute);
        // app.use('/', ResultsUserRoute);
        // app.use('/user', ResultUserRoute);
        // app.use('/user', DeleteUserRoute);
        // app.use('/user', UpdateUserRoute);

        // //init credits routes
        // app.use('/credit', CreateCreditsRoute);
        // app.use('/credit', ResultsCreditsRoute);
        // app.use('/credit', ResultCreditsRoute);
        // app.use('/credit', DeleteCreditsRoute);
        // app.use('/credit', UpdateCreditsRoute);

        // //init credits routes
        // app.use('/subject', CreateSubjectRoute);
        // app.use('/subject', ResultsSubjectRoute);
        // app.use('/subject', ResultSubjectRoute);
        // app.use('/subject', DeleteSubjectRoute);
        // app.use('/subject', UpdateSubjectRoute);
    }
}

module.exports = { DefaultRoutes };