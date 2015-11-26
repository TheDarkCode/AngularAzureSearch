using AngularAzureSearch.WebAPI.Services;
using AngularAzureSearch.WebAPI.Helpers;
using System;
using System.IO;
using System.Net.Mail;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularAzureSearch.WebAPI.Controllers
{
    public class HomeController : Controller
    {
        public IMailService _mail;
        public HomeController(IMailService mail)
        {
            _mail = mail;
        }

        public HomeController()
        {

        }

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult Contact(Models.ContactModels model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //MailMessage msg = new MailMessage();
                    //SmtpClient smtp = new SmtpClient();
                    //MailAddress from = new MailAddress(model.Email);
                    //StringBuilder sb = new StringBuilder();
                    //msg.IsBodyHtml = false;
                    ////smtp.Host = "SMTP SERVER";
                    ////smtp.UseDefaultCredentials = false;
                    ////smtp.Port = 465;
                    //msg.To.Add("DESTINATION EMAIL");
                    //msg.From = from;
                    //msg.Subject = "Angular Azure Search Contact Form: " + model.Subject;
                    //sb.Append("First name: " + model.FirstName);
                    //sb.Append(Environment.NewLine);
                    //sb.Append("Last name: " + model.LastName);
                    //sb.Append(Environment.NewLine);
                    //sb.Append("Email: " + model.Email);
                    //sb.Append(Environment.NewLine);
                    //sb.Append("Comments: " + model.Comment);
                    //msg.Body = sb.ToString();
                    //smtp.Send(msg);
                    //msg.Dispose();
                    model.Body = Extensions.FormatBody(model.FirstName, model.From, model.Body);
                    model.Subject = string.Format("{0} needs contacted about {1}", model.From, model.Subject);
                    model.To = "info@dryverless.com";
                    model.From = model.Email;
                    if (_mail.SendMail(model.From, model.To, model.Subject, model.Body, true))
                    {
                        ViewBag.MailSent = true;
                    }
                    else
                    {
                        ViewBag.Error = true;
                        ViewBag.ErrorMessage = "There was an error receiving your info. Please try again later.";
                    }
                    return View("Contact");

                    //return View("Success");
                }
                catch (Exception)
                {
                    ViewBag.Error = true;
                    ViewBag.ErrorMessage = "There was an error receiving your info. Please try again later.";

                    //return View("Error");
                }

            }
            return View();
        }
    }
}
