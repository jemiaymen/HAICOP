using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HAICOP.Models.AccountViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "اجباري")]
        public string Email { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "تذكر المستخدم")]
        public bool RememberMe { get; set; }
    }
}
