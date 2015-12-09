using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using DocumentDB.AspNet.Identity;
using AngularAzureSearch.WebAPI.Entities;
using AngularAzureSearch.WebAPI.Helpers;
using System.Security.Claims;
using Microsoft.Owin.Security;
using SendGrid;
using System.Net;
using System.Diagnostics;
using Twilio;

namespace AngularAzureSearch.WebAPI
{
    public class EmailService : IIdentityMessageService
    {
        /// <summary>
        /// SendGrid Email Settings (can be processed to array using helper to use multiple accounts).
        /// Ie: you use a comma between each value, and then use a.Split(',') call to build an array
        /// then grab string[0], string[1], etc.With potential iterators to check that it.Contains("EXAMPLE")
        /// </summary>
        public static string MailAccount = AppSettingsConfig.MailAccount;
        public static string MailPassword = AppSettingsConfig.MailPassword;
        public static string MailFromAddress = AppSettingsConfig.MailFromAddress;
        public static string MailFromName = AppSettingsConfig.MailFromName;

    //    Default SendAsync ::
    //
    //    public Task SendAsync(IdentityMessage message)
    //    {
    //        // Credentials:
    //        var sentFrom = MailFromAddress;

        //        // Configure the client:
        //        System.Net.Mail.SmtpClient client =
        //            new System.Net.Mail.SmtpClient();

        //        // Create the message:
        //        var mail =
        //            new System.Net.Mail.MailMessage();

        //        mail.From = new System.Net.Mail.MailAddress(sentFrom);
        //        mail.To.Add(message.Destination);
        //        mail.Subject = message.Subject;
        //        mail.Body = message.Body;

        //        // Send:
        //        return client.SendMailAsync(mail);
        //    }
        //}


        /// <summary>
        /// SendGrid SendAsync
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public Task SendAsync(IdentityMessage message)
    {
        return configSendGridasync(message);
    }

    /// <summary>
    /// Configure SendGrid Async
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    private Task configSendGridasync(IdentityMessage message)
    {
        // SendGridMessage allows you to use HTML by entering it as a string.
        var myMessage = new SendGridMessage();
        myMessage.AddTo(message.Destination);
        myMessage.From = new System.Net.Mail.MailAddress(
                            MailFromAddress, MailFromName);
        myMessage.Subject = message.Subject;
        myMessage.Text = message.Body;
        myMessage.Html = message.Body;

        var credentials = new NetworkCredential(
                   MailAccount,
                   MailPassword
                   );

        // Create a Web transport for sending email.
        var transportWeb = new Web(credentials);

        // Send the email.
        if (transportWeb != null)
        {
            return transportWeb.DeliverAsync(myMessage);
        }
        else
        {
            return Task.FromResult(0);
        }
    }
}
public class SmsService : IIdentityMessageService
    {
        /// <summary>
        /// Twilio SMS Settings
        /// </summary>
        public static string TwilioSid = AppSettingsConfig.TwilioSid;
        public static string TwilioToken = AppSettingsConfig.TwilioToken;
        public static string TwilioFromPhone = AppSettingsConfig.TwilioFromPhone;

        public Task SendAsync(IdentityMessage message)
        {
            var Twilio = new TwilioRestClient(
               TwilioSid,
               TwilioToken
           );
            var result = Twilio.SendMessage(
                TwilioFromPhone,
               message.Destination, message.Body);

            // Status is one of Queued, Sending, Sent, Failed or null if the number is not valid
            Trace.TraceInformation(result.Status);

            // Twilio doesn't currently have an async API, so return success.
            return Task.FromResult(0);
        }
    }


    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            string endpoint = AppSettingsConfig.EndPoint;
            string authkey = AppSettingsConfig.AuthKey;
            string db = AppSettingsConfig.Db;
            string collection = AppSettingsConfig.UserCollection;

            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(new Uri(endpoint), authkey, db, collection));
            // Configure validation logic for usernames

            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true

            };

            // Configure user lockout defaults
            manager.UserLockoutEnabledByDefault = true;
            manager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            manager.MaxFailedAccessAttemptsBeforeLockout = 5;


            // Register two factor authentication providers. This application uses Phone and Emails as a step of
            // receiving a code for verifying the user.
            // You can write your own provider and plug it in here.
            manager.RegisterTwoFactorProvider("Phone Code", new PhoneNumberTokenProvider<ApplicationUser>
            {
                MessageFormat = "Your AngularAzureSearch security code is {0}"
            });
            manager.RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<ApplicationUser>
            {
                Subject = "AngularAzureSearch Security Code",
                BodyFormat = "Your AngularAzureSearch security code is {0}"
            });

            manager.EmailService = new EmailService();
            manager.SmsService = new SmsService();

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }

    // Configure the application sign-in manager which is used in this application.
    public class ApplicationSignInManager : SignInManager<ApplicationUser, string>
    {
        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager)
            : base(userManager, authenticationManager)
        {
        }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
        {
            return user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager);
        }

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }
    }
}
