using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using HAICOP.Models;
using HAICOP.Data;

namespace HAICOP.Controllers
{

    [Authorize]
    public class HomeController : BaseCtrl
    {
        public HomeController(UserManager<ApplicationUser> userManager,
                            SignInManager<ApplicationUser> signInManager,
                            ApplicationDbContext db):
                            base(userManager,signInManager,db)  { }
        public IActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public IActionResult Error(int? id)
        {
            if(id != null)
            {
                switch(id)
                {
                    case 404:
                        return View("404");
                    case 501:
                        return View("501");
                    case 500:
                        return View("500");
                    default:
                        return View("404");

                }
            }
            return View("404");
        }
    }
}
