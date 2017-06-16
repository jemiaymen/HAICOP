using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace HAICOP.Models.AccountViewModels
{
    public class RegisterViewModel
    {

        [Required(ErrorMessage = "اجباري")]
        [EmailAddress]
        [Display(Name = "البريد الإلكتروني")]
        public string Email { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [StringLength(255, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        [Display(Name = "اسم المستخدم")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [StringLength(255, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        [Display(Name = "الإسم واللقب")]
        public string FirstLastName { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [StringLength(100, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "كلمة السر")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "إعادة كلمة السر")]
        [Compare("Password", ErrorMessage = "يجب أن تكون متطابقة مع كلمة السر")]
        public string ConfirmPassword { get; set; }


        [Required(ErrorMessage = "اجباري")]
        [Display(Name ="دور المستخدم")]
        public string Role {get ; set;}


        public List<ApplicationRole> Roles { get; set; }
    }
}
