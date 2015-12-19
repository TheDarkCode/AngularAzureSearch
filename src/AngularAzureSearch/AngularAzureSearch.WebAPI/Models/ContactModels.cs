using System.ComponentModel.DataAnnotations;

namespace AngularAzureSearch.WebAPI.Entities
{
    public class ContactModels
    {
        [Required(ErrorMessage = "Subject is required")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Comment is required")]
        public string Comment { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Body { get; set; }
    }
}